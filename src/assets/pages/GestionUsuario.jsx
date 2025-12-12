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
  const isAdmin = checkUserRole('administrador');

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
    tipo: 'vendedor',
    password: '',
  });

  const [editId, setEditId] = useState(null);
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
        // Si password está vacío, no se envía
        if (!dataToSend.password) delete dataToSend.password;

        await updateUsuario(editId, dataToSend);
        alert('Usuario actualizado correctamente.');
      } else {
        await createUsuario(dataToSend);
        alert('Usuario creado correctamente.');
      }

      setFormData({ nombre: '', correo: '', tipo: 'vendedor', password: '' });
      setEditId(null);
      loadUsuarios();

    } catch (e) {
      setError(e.message);
    }
  };

  const handleEdit = (usuario) => {
    setEditId(usuario.id);
    setFormData({
      nombre: usuario.nombre,
      correo: usuario.correo,
      tipo: usuario.tipo,
      password: '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este usuario?')) return;

    try {
      await deleteUsuario(id);
      alert('Usuario eliminado.');
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
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block">Contraseña {editId && '(opcional)'}</label>
              <input
                id="usuario-password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required={!editId}
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
                <option value="administrador">Administrador</option>
                <option value="vendedor">Vendedor</option>
                <option value="cliente">Cliente</option>
              </select>
            </div>

            <Button type="submit">{editId ? 'Actualizar Usuario' : 'Guardar Usuario'}</Button>

            {editId && (
              <Button
                variant="secondary"
                onClick={() => {
                  setEditId(null);
                  setFormData({ nombre: '', correo: '', tipo: 'vendedor', password: '' });
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
                    <td colSpan="5" className="text-center p-4 text-gray-500">No hay usuarios.</td>
                  </tr>
                ) : (
                  usuarios.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2">{user.id}</td>
                      <td className="px-3 py-2">{user.nombre}</td>
                      <td className="px-3 py-2">{user.correo}</td>
                      <td className="px-3 py-2 capitalize">{user.tipo}</td>
                      <td className="px-3 py-2 space-x-2">
                        <Button variant="secondary" onClick={() => handleEdit(user)} className="px-3 py-1">Editar</Button>
                        <Button variant="danger" onClick={() => handleDelete(user.id)} className="px-3 py-1">Eliminar</Button>
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
