import Swal from 'sweetalert2'

export const showSuccessAlert = (texto) => {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: texto || 'Tarea completada'
  })
}

export const showQuestionAlert = (titulo, confirmCallback) => {
  Swal.fire({
    icon: 'question',
    title: titulo,
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Eliminar',
    confirmButtonColor: '#D84949'
  })
    .then(res => {
      if (res.isConfirmed) {
        confirmCallback()
      }
    })
}
