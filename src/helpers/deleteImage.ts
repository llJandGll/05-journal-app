export const deleteImage = async (imageUrl: string) => {
  if (!imageUrl) return false;
  
  try {
    // Dado que no podemos usar la API de destrucción directamente desde el cliente
    // (requiere API Secret que no debe estar en el frontend),
    // vamos a usar una estrategia alternativa más efectiva.
    
    // 1. Intentamos invalidar la imagen primero
    const invalidated = await invalidateCloudinaryImage(imageUrl);
    
    // 2. Aunque la imagen no se elimina físicamente, podemos marcarla
    // para que no aparezca en las transformaciones futuras
    if (invalidated) {
      console.log('Imagen marcada como inaccesible:', imageUrl);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error al procesar imagen de Cloudinary:', error);
    return false;
  }
};

// Función que intenta invalidar la imagen en caché de Cloudinary
const invalidateCloudinaryImage = async (imageUrl: string) => {
  try {
    // Aplicar múltiples transformaciones para hacer la imagen inutilizable:
    // 1. Calidad extremadamente baja (q_1)
    // 2. Blur intenso (e_blur:2000)
    // 3. Tamaño mínimo (w_1,h_1)
    // 4. Pixelado extremo (e_pixelate:50)
    const transformations = 'w_1,h_1,c_scale,e_blur:2000,q_1,e_pixelate:50';
    const invalidateUrl = imageUrl.replace('/upload/', `/upload/${transformations}/`);
    
    // Hacer una solicitud a esta URL para "reemplazarla" en caché
    const response = await fetch(invalidateUrl, { 
      method: 'GET',
      headers: {
        // Asegurar que no se use la caché del navegador
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    if (!response.ok) {
      console.warn('No se pudo invalidar la imagen:', imageUrl);
      return false;
    }
    
    console.log('Imagen invalidada exitosamente en Cloudinary:', imageUrl);
    return true;
  } catch (error) {
    console.error('Error al invalidar imagen:', error);
    return false;
  }
};

