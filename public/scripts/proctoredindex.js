var HOST = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(HOST);
var el;

ws.onmessage = function (event) {
 console.log('Server time: ' + event.data);
};

//actual code


const roomList =document.querySelector('.rooms');
const signupbtn=document.querySelector('#signup-btn');
const signoutbtn=document.querySelector('#signout-btn');
let userd=null;
const newroombtn=document.querySelector('#newroombtn');
const newroomform=document.querySelector('#newroomform');

signupbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    login();
    
});
signoutbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    logout();
    
});
function confirmDialog(message, onConfirm){
    var fClose = function(){
          modal.modal("hide");
    };
    var modal = $("#confirmModal");
    modal.modal("show");
    $("#confirmMessage").empty().append(message);
    $("#confirmOk").unbind().one('click', onConfirm).one('click', fClose);
    $("#confirmCancel").unbind().one("click", fClose);
}
const myRooms = (rooms) =>{
    let html='';
    rooms.forEach(e => {
        const room=e.data()
        if (room.user==userd.email){
        var type = room.public ? "public": "private";
        const li= `
        <div class="col-md-4">
              <div class="card mb-4 box-shadow">
              <div class="card-header font-weight-bold">${room.name}</div>
                <div class="card-body">
                  <p class="card-text"><div class="p-1 rounded ${room.public?'bg-success':'bg-danger'} text-white">${type}</div><br>

                  <div class="p-1"><span class="font-weight-bold">Participants Link </span><br>
                  <div class="row">
  <div class="col-sm-8"><a href="${room.link}" target="_blank" class="small">${room.link}</a></div>
  <div class="col-sm-4 d-flex align-items-center justify-content-center"><button title="copy link" class="btn btn-light border rounded shadow" value="${room.link}" onclick="copy(this.value)"><i class="fas fa-copy" ></i></button></div>
</div>
       </div>
                  </p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-warning"><i class="fas fa-door-open"></i> Join</button>
                      <button type="button" class="btn btn-sm btn-dark" value="${e.id}" onclick="deleteRoom(this.value)"><i class="fas fa-trash"></i> Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `;
        html+=li;

        }
    });
    roomList.innerHTML=html;
}
const copy=(e)=>{
    navigator.clipboard.writeText(e);
    $('#copyToast').toast('show');
  }
const typecheck = () =>{
    let x=$('#roomtype').val();
    console.log(x)
    if(x=="false"){
        $('#emailsform').attr("hidden",false);
    }
    else{
        $('#emailsform').attr("hidden",true);
    }
}
newroombtn.addEventListener('click',(e)=>{
     let room={
    name:newroomform['roomname'].value,
    public:newroomform['roomtype'].value=="true" ? true :false ,
    user:userd.email,
    participants:newroomform['roomtype'].value=="false" ? $("#emails").tagsinput('items') : "",
    link:"https://sheltered-badlands-08154.herokuapp.com/"
}
    newRoom(room);
    
})