import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { GruposBack} from "./grupos"
export const Tareas = new Mongo.Collection("tareas");

if (Meteor.isServer) {
  Meteor.publish("tareas", () => {
    return Tareas.find({});
  });
}

//db.inventory.find( { tags: "red" } )


if (Meteor.isServer) {
  Meteor.publish("tareasPropias", () => {
    return Tareas.find({currentOwners: Meteor.user.userId });
  });
}



  if (Meteor.isServer) {
    Meteor.publish("tareasAyuda", () => {

       // db.scores.find(  { results: { $elemMatch: { $gte: 80, $lt: 85 } } } )
      var groupsIbelong= GruposBack.find({usuarios:Meteor.user.userId}, { sort: { createdAt: -1 } }).fetch()

        for (group in groupsIbelong){

                var resp=[];
                resp.push(Tareas.find({
                    $and:[{delayed},{groupId:group}] 
                }))
                resp.push(Tareas.find({groupId:group }));

        }
        return resp;

    });
  }
Meteor.methods({
  "tareas.insert": (nombreP, descriptionP, groupId, dueDateP, usuarios) => {
    Tareas.insert({
      nombre: nombreP,
      description: descriptionP,
      fechaCreacion: new Date(),
      currentOwners: usuarios,
      creator: Meteor.user.userId,
      porcentageDone: 0,
      hasTraspased: false,
      delayed: false,
      grupoId: groupId,
      dueDate: dueDateP
    });
  },
  "tareas.tomar": taskId => {
    Tareas.update({ _id: taskId }, { $push: { currentOwners: this.userId } });
    Tareas.update({ _id: taskId }, { $set: { delayed: false } });

    //Tareas.update({ "_id" : ObjectId("5d9eada4349da0a208beedab") }, { $push: { currentOwners: this.userId } });
    //Tareas.update({ "_id" : ObjectId("5d9eada4349da0a208beedab") }, { $set:{delayed: false } });
  },
  "tareas.pedirAyuda": taskId => {
    Tareas.update({ _id: taskId }, { $set: { delayed: true } });
  },
  "tareas.marcarPorcentaje": (taskId, porcent) => {
    Tareas.update({ _id: taskId }, { $set: { porcentageDone: porcent } });
  }
});
