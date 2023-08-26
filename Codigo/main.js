function ingreso(form){
    const usr = form.querySelector("input[name='usr']").value;
    const psw = form.querySelector("input[name='psw']").value;

    $.ajax({
        type: "POST",
        url: "login.php",
        data: { usr: usr, psw: psw },
        success: function (response) {
            console.log(response);
            if (response = "Yes" ){
                console.log("entre pa");
            }else{
                console.log("No");
                //Swal.fire({
                //    icon: 'Error',
                //    title: 'Oops...',
                //    text: 'No pa!',
                //    footer: ''
                //}); 
            }
        },
        error: function () {
            alert("hola");
        }
    });
}