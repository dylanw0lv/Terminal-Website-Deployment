let element = document.getElementById("startup");

let newEl1 = document.createElement("pre");
newEl1.classList.add("startup2");

newEl1.innerHTML = "Dylan Wolverton (DW) Not Exactly A Corporation. No rights reserved.";

element.appendChild(newEl1);


let newEl2 = document.createElement("pre");
newEl2.classList.add("startup");

newEl2.innerHTML = 
` ::::::::  :::    :::     ::: :::::::::::      :::::::::   :::::::: ::::::::::: 
:+:    :+: :+:    :+:   :+: :+:   :+:          :+:    :+: :+:    :+:    :+:     
+:+        +:+    +:+  +:+   +:+  +:+          +:+    +:+ +:+    +:+    +:+     
+#+        +#++:++#++ +#++:++#++: +#+          +#++:++#+  +#+    +:+    +#+     
+#+        +#+    +#+ +#+     +#+ +#+          +#+    +#+ +#+    +#+    +#+     
#+#    #+# #+#    #+# #+#     #+# #+#          #+#    #+# #+#    #+#    #+#     
 ########  ###    ### ###     ### ###          #########   ########     ###`

 element.appendChild(newEl2);


let newEl3 = document.createElement("pre");
newEl3.classList.add("startup3");

newEl3.innerHTML = 
`Type 'back' to go back to the main page.
Type 'clear to clear the page.

Type a prompt and click enter to prompt the bot.`;

element.appendChild(newEl3);