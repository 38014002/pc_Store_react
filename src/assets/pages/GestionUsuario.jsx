import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../services/gestionusuario.js';
import { checkUserRole, logout } from '../services/Auth.js';

// --- Botón con estilos ---
const Button = ({ onClick, children, variant = 'primary', className = '', ...props }) => {
  const baseStyles =
    'px-4 py-2 text-sm font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-transform transform hover:scale-105 duration-150 ease-in-out';

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400';
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      default:
        return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 w-full';
    }
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${getVariantStyles()} ${className}`} {...props}>
      {children}
    </button>
  );
};

const GestionUsuarios = () => {
  const navigate = useNavigate();
  const isAdmin = checkUserRole('admin');

  useEffect(() => {
    if (!isAdmin) {
      alert('Acceso denegado. Se requiere rol de administrador.');
      logout();
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    tipo: 'cliente', // Valor por defecto
    password: '',
  });

  const [editId, setEditId] = useState(null); // Esto ahora será el correo del usuario a editar
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUsuarios = async () => {
    setLoading(true);
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (e) {
      setError('No se pudieron cargar los usuarios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) loadUsuarios();
  }, [isAdmin]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id.replace('usuario-', '')]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const dataToSend = { ...formData };

    try {
      if (editId) {
        // Si el password está vacío, no se envía para no sobreescribirlo
        if (!dataToSend.password) delete dataToSend.password;

        await updateUsuario(editId, dataToSend); // editId es el correo
        alert('Usuario actualizado correctamente.');
      } else {
        await createUsuario(dataToSend);
        alert('Usuario creado correctamente.');
      }

      setFormData({ nombre: '', correo: '', tipo: 'cliente', password: '' });
      setEditId(null);
      loadUsuarios();

    } catch (e) {
      setError(e.message);
    }
  };

  // --- CORRECCIÓN 1: Usar 'usuario.correo' para identificar qué editar ---
  const handleEdit = (usuario) => {
    setEditId(usuario.correo); // <--- CAMBIO CLAVE AQUÍ
    setFormData({
      nombre: usuario.nombre,
      correo: usuario.correo,
      tipo: usuario.tipo,
      password: '', // El campo de la contraseña se deja vacío por seguridad
    });
  };

  const handleDelete = async (correo) => {
    if (!window.confirm('¿Está seguro de que desea eliminar este usuario?')) return;

    try {
      await deleteUsuario(correo);
      alert('Usuario eliminado correctamente.');
      loadUsuarios();
    } catch (e) {
      setError(e.message);
    }
  };


  if (loading) return <div className="p-8 text-center">Cargando usuarios...</div>;

  return (
    <main className="max-w-6xl mx-auto p-4 md:p-8 bg-gray-50 rounded-xl shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-6">Gestión de Usuarios (Admin)</h1>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4 rounded-lg">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Formulario */}
        <section className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            {editId ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block">Nombre</label>
              <input
                id="usuario-nombre"
                type="text"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block">Correo</label>
              <input
                id="usuario-correo"
                type="email"
                value={formData.correo}
                onChange={handleInputChange}
                required
                disabled={!!editId} // No se puede editar el correo
                className="mt-1 w-full border rounded-md p-2 bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block">Contraseña {editId && '(dejar en blanco para no cambiar)'}</label>
              <input
                id="usuario-password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required={!editId} // Requerida solo al crear
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block">Tipo de Usuario</label>
              <select
                id="usuario-tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                className="mt-1 w-full border rounded-md p-2"
              >
                <option value="admin">Administrador</option>
                <option value="usuario">Cliente</option>
              </select>
            </div>

            <Button type="submit">{editId ? 'Actualizar Usuario' : 'Guardar Usuario'}</Button>

            {editId && (
              <Button
                type="button" // Importante para que no envíe el formulario
                variant="secondary"
                onClick={() => {
                  setEditId(null);
                  setFormData({ nombre: '', correo: '', tipo: '', password: '' });
                }}
              >
                Cancelar Edición
              </Button>
            )}
          </form>
        </section>

        {/* Lista */}
        <section className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Listado de Usuarios</h2>

          <div className="max-h-[600px] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-semibold">ID</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold">Nombre</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold">Correo</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold">Tipo</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold">Acciones</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-500">No hay usuarios para mostrar.</td>
                  </tr>
                ) : (
                  usuarios.map((user) => ( // La variable aquí es 'user'
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2">{user.id}</td>
                      <td className="px-3 py-2">{user.nombre}</td>
                      <td className="px-3 py-2">{user.correo}</td>
                      <td className="px-3 py-2 capitalize">{user.tipo}</td>
                      <td className="px-3 py-2 space-x-2">
                        <Button variant="secondary" onClick={() => handleEdit(user)} className="px-3 py-1">Editar</Button>
                        {/* --- CORRECCIÓN 2: Usar la variable correcta 'user' --- */}
                        <Button variant="danger" onClick={() => handleDelete(user.correo)} className="px-3 py-1">Eliminar</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </main>
  );
};

export default GestionUsuarios;