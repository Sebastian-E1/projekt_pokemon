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
      
      

    })
    .catch(err => {
      //om det blir fel körs denna kod:
      console.log(err);
      document.getElementById("pokemon_name").innerHTML =
        "No pokemon by that name";
    });
}
