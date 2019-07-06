//************************** ADMINISTRATIVO *********************************

//    var dniFiltro=localStorage.getItem("dniBuscar");
  
//************************** PENDIENTE*********************************
function redireccionlistarPersonal(dni) {
    localStorage.setItem("dni", dni);
    window.location = "listadoPersonal.jsp";

}
function  redirecionProgramacion(dni) {
    localStorage.setItem("dniGeneral", dni);
    window.location = "reporteProgramacion.jsp";
}
