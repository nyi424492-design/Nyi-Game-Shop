const register = async()=>{

const {data,error} =
await supabase.auth.signUp({

email,
password

});


if(error){

alert(error.message);

}else{

alert("Account Created");

}

};