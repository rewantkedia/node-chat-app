class Users{
    constructor(){
        this.users = [];
    }
    addUser(id,name,room){
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        var user = this.getUser(id);
        if(user)
        {
            this.users = this.users.filter((user)=>{
                return user.id !== id ;
            })
        }
        return user[0];
    }
    getUser(id){
        var us = this.users.filter((user)=>{
            return user.id === id;
        })
        return us;
    }
    getUserList(room){
        var users = this.users.filter((user)=>{
            return user.room === room;
        })
        var namesArray = this.users.map((user)=>{
            return user.name;
        })
        return namesArray;
    }

}

module.exports={Users};