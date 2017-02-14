/* preenche a cor verde quando clicado */
$("#checkbox-1").click(function(){
    $("#checkbox-1").css("background","#3cad54");
});

/* verifica se o checkbox foi clicado */
$(document).ready(function () {

   $(".btn-blue").click(function () {  
      if( $("#checkbox").css("background","#3cad54")){
            
            alert('Campo esta selecionado!'); 

      } else {
            
            alert('Campo não selecionado!');
      }
  
   });

 
});