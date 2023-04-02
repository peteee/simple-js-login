        /**
         * Simple Hashing Function
         * @link: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
         * @usage: str.hashCode() 
         */
        String.prototype.hashCode = function() {
            let hash = 0,
                i, chr;
            if (this.length === 0) return hash;
            for (i = 0; i < this.length; i++) {
                chr = this.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        }

        /**
         * set up vars
         */
        const container = document.querySelector("main");

        const setupForm = `
            <h1>User Setup</h1>
            <input type="text" name="username" id="username" placeholder="User" required>
            <input type="password" name="password" id="password" placeholder="Password" required>
            <button id="setup" onclick="storeMe()">Store User</button>
        `;

        const loginForm = `
            <h1>Login</h1>
            <input type="password" name="password" id="password" placeholder="Password" required>
            <button id="login" onclick="logMeIn()">Log in</button>
        `;

        if(localStorage.getItem("logged-in") === "true") {
            window.userOk = true;
            let uName = localStorage.getItem("name");
            container.innerHTML =  `<h2>Hi there ${uName}!</h2>
            <p>
                <button id="logout" onclick="logOut()">Log out</button><br>
                <br>
                <button id="erase" onclick="eraseMe()">Delete user and start over</button>
            </p>
            `;

        } else {
            if(localStorage.getItem("name"))
                container.innerHTML = loginForm
            else
                container.innerHTML = setupForm
        }
        /**
         * Store user data
         */
        function setUser(name, pass) {
            console.log("storing data")
            passhash = pass.hashCode();
            //store data
            localStorage.setItem("name", name);
            localStorage.setItem("pass", passhash);
        }
        /**
         * Call user data
         */
        function getUser(pass) {
            console.log("checking...");
            //retrieve data
            let storedName = localStorage.getItem("name");
            let storedPass = localStorage.getItem("pass");
            let hash2Compare = pass.hashCode(); 
            if(hash2Compare == storedPass) {
                console.log("logging in...");
                localStorage.setItem("logged-in", true);
            } else {
                localStorage.setItem("logged-in", false);
            }
        }

        function storeMe() {
            let inputUser = document.querySelector("#username");
            let inputUserPw = document.querySelector("#password");
            const inputBtn = document.querySelector("#setup");
            setUser(inputUser.value, inputUserPw.value);
            container.innerHTML = "";
            location.reload()
        };

        function logMeIn() {
            let inputUserPw = document.querySelector("#password");
            const loginBtn = document.querySelector("#login");
            getUser(inputUserPw.value);
            container.innerHTML = "";
            location.reload();
        };

        function logOut() {
            localStorage.setItem("logged-in", false);
            location.reload()
        }

        function eraseMe() {
            if (confirm("Really??") == true) {
                localStorage.removeItem("name");
                localStorage.removeItem("pass");
                localStorage.removeItem("logged-in");
                location.reload()
            } 
        }
