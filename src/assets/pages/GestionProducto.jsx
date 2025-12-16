// src/pages/GestionProductos.jsx
import React, { useState, useEffect } from 'react';
// --- 1. IMPORTAMOS TODAS LAS FUNCIONES QUE NECESITAREMOS ---
import { crearProducto, getProductosGestion, actualizarProducto, eliminarProducto } from '../services/gestionproductos';

const GestionProductos = () => {
    
    // Estado inicial para un producto vacío (para limpiar el formulario)
    const initialState = {
        codigo: '',
        nombre: '',
        descripcion: '',
        precio: '',
        stock: 0,
        categoria: '',
        imagen: '',
    };

    // Estado para los datos del formulario
    const [formData, setFormData] = useState(initialState);
    
    // --- 2. AÑADIMOS UN ESTADO PARA SABER QUÉ PRODUCTO ESTAMOS EDITANDO ---
    const [editingCodigo, setEditingCodigo] = useState(null); // null si estamos creando, o el 'codigo' si estamos editando

    // Estados para la lista
    const [listaProductos, setListaProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Carga inicial de productos
    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        setLoading(true);
        try {
            const data = await getProductosGestion();
            setListaProductos(data.error ? [] : data);
            setError(data.error || null);
        } catch (e) {
            setError("Error de conexión al cargar la lista.");
        } finally {
            setLoading(false);
        }
    };

    // Handler para los cambios en el formulario
    const handleChange = (e) => {
        const { id, value, type } = e.target;
        const newValue = type === 'number' ? (parseFloat(value) || 0) : value;
        setFormData(prev => ({
            ...prev,
            [id.replace('producto-', '')]: newValue,
        }));
    };

    // --- 3. MODIFICAMOS HANDLESUBMIT PARA QUE HAGA CREATE O UPDATE ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!localStorage.getItem('jwt_token')) {
            alert('Error: Debe iniciar sesión.');
            return;
        }

        try {
            let resultado;
            // Si hay un 'editingCodigo', actualizamos. Si no, creamos.
            if (editingCodigo) {
                resultado = await actualizarProducto(editingCodigo, formData);
                alert('¡Producto actualizado con éxito!');
            } else {
                resultado = await crearProducto(formData);
                alert('¡Producto creado con éxito!');
            }

            if (resultado.error) {
                throw new Error(resultado.error);
            }
            
            handleCancelEdit(); // Limpiamos el formulario y el modo edición
            cargarProductos(); // Refrescamos la lista

        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    // --- 4. IMPLEMENTAMOS LA LÓGICA DE 'handleEdit' ---
    const handleEdit = (prod) => {
        // Llenamos el formulario con los datos del producto a editar
        setFormData(prod);
        // Guardamos el código del producto que estamos editando
        setEditingCodigo(prod.codigo);
        // Opcional: lleva al usuario a la parte superior de la página para ver el formulario
        window.scrollTo(0, 0);
    };

    const handleDelete = async (codigo) => {
        if (!window.confirm(`¿Seguro que deseas eliminar el producto con código "${codigo}"?`)) return;
        
        const resultado = await eliminarProducto(codigo);
        if (resultado.error) {
            alert(`Error al eliminar: ${resultado.error}`);
        } else {
            alert('Producto eliminado correctamente.');
            cargarProductos();
        }
    };
    
    // --- 5. AÑADIMOS UNA FUNCIÓN PARA CANCELAR LA EDICIÓN ---
    const handleCancelEdit = () => {
        setEditingCodigo(null);
        setFormData(initialState);
    };

    // --- 6. RENDERIZADO CON LÓGICA CONDICIONAL EN EL FORMULARIO ---
    return (
        <main className="container admin-container">
            <section className="admin-form">
              {/* El título y el botón cambian según si estamos editando o no */}
              <h2>{editingCodigo ? 'Editar Producto' : 'Agregar Producto'}</h2>
              <form id="form-producto" noValidate onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="producto-codigo">Código producto</label>
                    {/* Deshabilitamos el campo código durante la edición */}
                    <input type="text" id="producto-codigo" required value={formData.codigo} onChange={handleChange} disabled={!!editingCodigo} />
                </div>
                <div className="field">
                    <label htmlFor="producto-nombre">Nombre</label>
                    <input type="text" id="producto-nombre" required value={formData.nombre} onChange={handleChange} />
                </div>
                <div className="field">
                    <label htmlFor="producto-descripcion">Descripción</label>
                    <textarea id="producto-descripcion" value={formData.descripcion} onChange={handleChange}></textarea>
                </div>
                <div className="field">
                    <label htmlFor="producto-precio">Precio</label>
                    <input type="number" id="producto-precio" required min={0} step={0.01} value={formData.precio} onChange={handleChange} />
                </div>
                <div className="field">
                    <label htmlFor="producto-stock">Stock</label>
                    <input type="number" id="producto-stock" required min={0} value={formData.stock} onChange={handleChange} />
                </div>
                <div className="field">
                    <label htmlFor="producto-categoria">Categoría</label>
                    <select id="producto-categoria" required value={formData.categoria} onChange={handleChange}>
                        <option value="">Seleccione...</option>
                        <option value="hardware">Hardware</option>
                        <option value="perifericos">Computador</option>
                        <option value="accesorios">Accesorios</option>
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="producto-imagen">URL Imagen</label>
                    <input type="text" id="producto-imagen" value={formData.imagen} onChange={handleChange} />
                </div>

                {/* El texto del botón principal también cambia */}
                <button type="submit">{editingCodigo ? 'Actualizar Producto' : 'Agregar Producto'}</button>
                
                {/* Mostramos un botón de "Cancelar" solo si estamos editando */}
                {editingCodigo && (
                    <button type="button" onClick={handleCancelEdit} style={{marginTop: '10px', backgroundColor: '#6c757d'}}>
                        Cancelar Edición
                    </button>
                )}
              </form>
            </section>

            {/* LISTADO DE PRODUCTOS (Sin cambios) */}
            <section className="admin-listado">
                <h2>Listado de Productos</h2>
                <table id="tabla-productos">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Categoría</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && ( <tr><td colSpan="7">Cargando...</td></tr> )}
                        {error && ( <tr><td colSpan="7" style={{color: 'red'}}>{error}</td></tr> )}
                        {!loading && !error && listaProductos.length > 0 && (
                            listaProductos.map(prod => (
                                <tr key={prod.codigo}>
                                    <td>{prod.codigo}</td>
                                    <td>{prod.nombre}</td>
                                    <td>${prod.precio}</td>
                                    <td>{prod.stock}</td>
                                    <td>{prod.categoria}</td>
                                    <td><img src={prod.imagen} alt={prod.nombre} style={{ width: '50px' }} /></td>
                                    <td>
                                        <button onClick={() => handleEdit(prod)}>Editar</button>
                                        <button onClick={() => handleDelete(prod.codigo)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        )}
                        {!loading && !error && listaProductos.length === 0 && (
                            <tr><td colSpan="7">No hay productos para mostrar.</td></tr>
                        )}
                    </tbody>
                </table>
            </section>
        </main>
    );
};

export default GestionProductos;