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