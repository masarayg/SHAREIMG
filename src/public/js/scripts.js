$("#btn-delete").click(function(e){
    e.preventDefault();
    let $this = $(this);
    const response = confirm("¿Deseas eliminar esta imagen?") //ventana del propinio navegador
    
    if (response) {
        let imgId =$this.data("id");
        console.log(imgId);
    }
});