// Gemini Chatbot
const typingform = document.querySelector(".input")
const chatList = document.querySelector(".chat-list")

let usermessage = null;
const createmessageelement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add(...classes);
  div.innerHTML = content;
  return div;
}
const YOUR_API_KEY="AIzaSyAbZ493cC_n3J1qZJfu7kljAqarairWeno"

const apiUrl=`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${YOUR_API_KEY}`

const getApiResponse= async (incomingmessage)=>{

try {
  const response = await fetch(apiUrl,{
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify({
      contents:[{
        parts:[{
          text:usermessage
        }]
      }]
    })

  })

  const data=await response.json();
  const apiresponse= data.candidates[0].content.parts[0].text;
  console.log(data)
  console.log(apiresponse);
  incomingmessage.querySelector(".text").innerHTML=apiresponse;


}catch(error){
  console.log(error);
  
}finally{
  incomingmessage.classList.remove("loading")
}


}

const showloadinganimation=()=>{
  const html = `   <div class="message-incoming">
          <img src="./images/gemini.svg" alt="user-image" class="avatar">
          <p class="text">
          </p>
          <div class="loading-list">
            <div class="loading-bar"></div>
            <div class="loading-bar"></div>
            <div class="loading-bar"></div>
          </div>
        </div>
        <span class="icon material-symbols-rounded">content_copy</span>`;
  const incomingmessage = createmessageelement(html, "message","loading");
 
  chatList.appendChild(incomingmessage);
  getApiResponse(incomingmessage);

}


const handleoutgoingmessage = () => {
  usermessage = typingform.querySelector(".input-placeholder").value.trim();
  if (!usermessage) return;//return when no input in the form
  const html = `   <div class="message-outgoing">
        <img src="./images/user.jpg" alt="user-image" class="avatar">
        <p class="text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio laudantium tenetur fugit dolores. Cumque delectus, commodi earum quia id quod exercitationem doloribus itaque ea laborum voluptas officia maiores ad ducimus!
        </p>
      </div>`;
  const incomingmessage = createmessageelement(html, "message");
  incomingmessage.querySelector(".text").innerHTML = usermessage;
  chatList.appendChild(incomingmessage);

  typingform.reset();//clear input field
  setTimeout(showloadinganimation,500);


}
typingform.addEventListener("submit", (e) => {
  e.preventDefault();

  handleoutgoingmessage();

})