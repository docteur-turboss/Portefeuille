const { ActivityType, PresenceUpdateStatus } = require("discord.js")

module.exports = () =>{
	let arr = [
		{
			activities: [{name: 'Les conseils de la FED', type: ActivityType.Listening}], 
			status: PresenceUpdateStatus.DoNotDisturb 
		},{
			activities: [{name: 'Faire un crash boursier', type: ActivityType.Playing}], 
			status: PresenceUpdateStatus.DoNotDisturb 
		},{
			activities: [{name: 'La discode des marchés', type: ActivityType.Watching}], 
			status: PresenceUpdateStatus.DoNotDisturb 
		},{
			activities: [{name: 'Être le plus rentable', type: ActivityType.Competing}], 
			status: PresenceUpdateStatus.DoNotDisturb 
		},{
			activities: [{name: 'Son dépassement budgétaire', type: ActivityType.Watching}], 
			status: PresenceUpdateStatus.DoNotDisturb 
		},{
			activities: [{name: 'Son épargne fondre en antartique', type: ActivityType.Watching}], 
			status: PresenceUpdateStatus.DoNotDisturb 
		},{
			activities: [{name: 'Ruiner le casino', type: ActivityType.Playing}], 
			status: PresenceUpdateStatus.DoNotDisturb 
		}
	]
	return arr[Math.floor(Math.random() * arr.length)]
}