import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const GruposBack = new Mongo.Collection("grupos");

if (Meteor.isServer) {
  
  Meteor.publish("grupos", () => {

    if(Meteor.user()){
    
      return GruposBack.find({});

    }
    else{
      return [];
    }
    
  });
  Meteor.publish("users", () => {
    return Meteor.users.find({});
  });
}

 //db.inventory.find( { tags: "red" } )

Meteor.methods({
  // TODO: Hacer un metodo que busque un grupo por nombre, creador, usuarios, invitados
  "grupos.crear": (nameP, usuario) => {
    GruposBack.insert({
      nombre: nameP,
      creador: usuario,
      usuarios: [usuario]
    });
  },
  "grupos.invitar": (grupoId, invitados) => {


    for (i in invitados) {
      console.log(invitados[i])
    let grupoActual = GruposBack.findOne({_id: grupoId});
    let existe=false;
    console.log("grupoACTUAL",grupoActual)

    for(j in grupoActual.usuarios){
      console.log(grupoActual.usuarios[j],invitados[i])
      if(grupoActual.usuarios[j] === invitados[i] ){
        
        existe=true;
      }
    }
    if(!existe){
      GruposBack.update(
      { _id: grupoId },
      { $push: { usuarios: invitados[i] } }
      );
    }
     
    }
  },
  "grupos.entrar": (grupoId, nombre) => {
    //const usuarios = GruposBack.findOne({ nombre: nombreGrupo }).usuarios;
    GruposBack.update({ _id: grupoId }, { $push: { usuarios: nombre } });
  },
  "grupos.salir": grupoId => {
    //db.ejemplo.update(    { "_id" : ObjectId("5d9eada4349da0a208beedab") },    { $pull: { scores: 89 } } )
    GruposBack.update({ _id: grupoId }, { $pull: { usuarios: this.userId } });
  }
});
