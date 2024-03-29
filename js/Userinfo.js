import {
    onGetUsers,
    updateUsers,
    getUser,
    myJobauth,
    loggedinmail

  } from "./firebase.js";

  const infoForm = document.getElementById("info-form");
  const dataContainer = document.getElementById("info-container");
  
  myJobauth();//user logged in

  var nochangeemail = "0";
  var nochangepass = "0";

  let editStatus = false;
  let id = "";


  window.addEventListener("DOMContentLoaded", async (e) => {
    //creating edit information button if logged in
    onGetUsers((querySnapshot) => {
      dataContainer.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if(data.email == loggedinmail){  
        dataContainer.innerHTML += `
      <h3 class="h5"> שלום ${data.FirstName}</h3>
      <div>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
      🖉  ערוך פרטים אישיים
    </button>
      </div>
    </div>`;
     } });

      const btnsEdit = dataContainer.querySelectorAll(".btn-edit");
      //edit information button
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {

            const doc = await getUser(e.target.dataset.id);
            const data = doc.data();

            //filling up page with user information from database
            infoForm["UserFirstName"].value = data.FirstName;
            infoForm["UserLastName"].value = data.LastName;
            nochangeemail = data.email;
            nochangepass = data.Password;
            infoForm["UserAge"].value = data.Age;
            infoForm["UserLocation"].value = data.Location;
            infoForm["UserWantedJob"].value = data.WantedJob;
            infoForm["UserPhoneNumber"].value = data.PhoneNumber;
            infoForm["UserExp"].value = data.Exp;
            infoForm["UserGeneralExp"].value = data.GeneralExp;
            infoForm["Userpub"].value = data.Publish;
            editStatus = true;
            id = doc.id;
            infoForm["btn-info-form"].innerText = "עדכן";//creating update button
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
  });

  
infoForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    
    //reciving data from user inputs
    const UserFirstName = document.getElementById("UserFirstName").value;
    const UserLastName = document.getElementById("UserLastName").value;
    const UserAge = document.getElementById("UserAge").value;
    const UserLocation = document.getElementById("UserLocation").value;
    const UserPhoneNumber = document.getElementById("UserPhoneNumber").value;
    const UserExp = document.getElementById("UserExp").value;
    const UserWantedJob = document.getElementById("UserWantedJob").value;
    const UserGeneralExp = document.getElementById("UserGeneralExp").value;
    const Userpub = document.getElementById("Userpub").value;
    try {
      if (!editStatus) {
        
      } else {
        
        await updateUsers(id, {
          FirstName: UserFirstName,
          LastName: UserLastName,
            email: nochangeemail,
            Password: nochangepass,
            Age: UserAge,
            Location: UserLocation,
            PhoneNumber: UserPhoneNumber,
            GeneralExp:UserGeneralExp,
            WantedJob:UserWantedJob,
            Exp:UserExp,
            Publish:Userpub,

        });//seding new updated user data
   
        editStatus = false;
        id = "";
        infoForm["btn-info-form"].innerText = " ";
      }
      infoForm.reset();
      title.focus();
    } catch (error) {
      console.log(error);
    }
  });
