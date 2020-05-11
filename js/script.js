const P = new Pokedex.Pokedex();

function search() {
  var namn = document.getElementById ("namn").value;
  console.log(namn);

  P.getPokemonByName(namn)
    .then(res => {
      //om det blir rätt körs denna kod:
      console.log(res);
      document.getElementById("pokemon_name").innerHTML = res.name;
      document.getElementById(
        "pokemon_sprite"
      ).innerHTML = `<img src="${res.sprites.front_default}"/>`;
      if(res.sprites.front_shiny){
        
        document.getElementById(
          "pokemon_shiny_sprite"
        ).innerHTML = `<img src="${res.sprites.front_shiny}"/>`;
      }

      var stats = document.getElementById("stats");
      stats.innerHTML="";
      for(let i = 0; i < res.stats.length; i++){
        stats.innerHTML += "<p>" + res.stats[i].stat.name + " : " + res.stats[i].base_stat + "</p>";
      }
      var type = document.getElementById ("type");
      type.innerHTML = "Type: " + res.types[0].type.name;
      if (res.types.length === 2){
        type.innerHTML += "/" + res.types[1].type.name;
      }

      var moves = document.getElementById ("moves");
      moves.innerHTML=" ";
      

      for (let i = 0; i < res.moves.length; i++){
        

        
        if (window.innerWidth > 500) {
          moves.innerHTML += "<button onclick = 'move_info(`"+res.moves[i].move.name+"`)' class='rutor'> " + res.moves[i].move.name+"</button>";

         } 
        else {
          moves.innerHTML += "<button onclick = 'move_info(`"+res.moves[i].move.name+"`)' class='rutor-mobil'> " + res.moves[i].move.name+"</button>";

        }

      }
      
      

    })
    .catch(err => {
      //om det blir fel körs denna kod:
      console.log(err);
      document.getElementById("pokemon_name").innerHTML =
        "No pokemon by that name";
    });
}
document.getElementById ("move_info").style.display="none"
var input = document.getElementById("namn");
function move_info(move_name){
  console.log(move_name);
  document.getElementById ("move_info").style.display="block"
  P.getMoveByName(move_name)
  .then(function(response) {
    console.log(response);
    document.getElementById ("move_info").innerHTML=response.name + "<br>" 
    if(response.power==null){
      document.getElementById ("move_info").innerHTML += "Effect: " + response.effect_entries[0].effect+"<br> PP: " + response.pp+"<br> Priority: "+response.priority
    }
   else{
  
    document.getElementById ("move_info").innerHTML += "Power: " + response.power + "<br> PP: " + response.pp + "<br> Accuracy: " + response.accuracy + "<br>Priority: " + response.priority
   }   
    
  });
}

input.addEventListener("keyup", function(event) {

  if (event.keyCode === 13) {
  
    event.preventDefault();
    
    document.getElementById("search").click();
  }


});