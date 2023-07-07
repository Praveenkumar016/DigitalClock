var date;
        var mm;
        var hh;
        var am_pm;
        var settim1
        var settim2
        var cleartim1 = 0
        var cleartim2 = 0
        var count = 0
        var audio = new Audio();
        audio.src = "./alarm.mp3"
        // console.log(audio)

        var setBg = val => {document.body.style.backgroundImage = `url(./${val}.jpg)`;return val}

        document.getElementById("close1").addEventListener("click",(()=>{document.getElementById("greeting").style.display = "none";cleartim2 = 1}))

        

        

        function essentials(){
            date = new Date();
            mm = date.getMinutes()
            hh = date.getHours()
            am_pm = hh > 12 ? "PM" : "AM";
            hh = hh == 0 ? 12 : hh % 12
        }



        (function calenderFun(){
            essentials()
            var ss = date.getSeconds()
            var dd = date.getDate()
            var mo = date.getMonth()
            var yy = date.getFullYear()
            var day = date.getDay()

            // console.log(ss)
            // console.log(hh,am_pm)
            mo = mo == 0 ? "Jan" : mo == 1 ? "Feb" : mo == 2 ? "Mar" : mo == 3 ? "Apr" : mo == 4 ? "May" : mo == 5 ? "Jun" : mo == 6 ? "Jul" : mo == 7 ? "Aug" : mo == 8 ? "Sep" : mo == 9 ? "Oct" : mo == 10 ? "Nov" : "Dec"
            // console.log(mo)
            day = day == 0 ? (() => setBg("Sunday"))() : day == 1 ? (() => setBg("Monday"))() : day == 2 ? (() => setBg("Tuesday"))() : day == 3 ? (() => setBg("Wednesday"))() : day == 4 ? (() => setBg("Thursday"))() : day == 5 ? (() => setBg("Friday"))() : (() => setBg("Saturday"))()
            // console.log(day)

            var hhTemp = hh
            var mmTemp = mm

            if(hh <= 9)
                hhTemp = '0'+hh
            if(mm <= 9)
                mmTemp = '0'+mm


            document.getElementById("time").innerHTML = `${hhTemp}:${mmTemp} ${am_pm}`
            document.getElementById("date").innerHTML = `${dd}-${mo}-${yy}`
            document.getElementById("day").innerHTML = day
            document.getElementById("sec").innerText = ss
            setTimeout(calenderFun,1000)
        })()

        function greeting(){
            count++
            // console.log(count)
            document.getElementById("greeting").style.display = "flex"
            if(am_pm == "AM")
                document.getElementById("greet").innerHTML = "Good Morning!"
            else if(am_pm == "PM" && hh < 5)
                document.getElementById("greet").innerHTML = "Good Afternoon!"
            else if(am_pm == "PM" && hh >= 5)
                document.getElementById("greet").innerHTML = "Good Evening!"
            if(count == 5 || cleartim2 == 1)
                document.getElementById("greeting").style.display = "none"
            var settim2 = setTimeout(greeting,1000)
            if(count == 5)
                clearTimeout(settim2)   
        }
        greeting()

        document.getElementById("close").addEventListener("click",(()=>{document.getElementById("alarmContainer").style.display = 'none';document.getElementById("bell").style.display = 'block'}))
        document.getElementById("bell").addEventListener("click",(()=>{document.getElementById("alarmContainer").style.display = 'flex';document.getElementById("bell").style.display = 'none'}))

        document.getElementById("btn").addEventListener("click",setAlarm)

        function setAlarm(){
            document.getElementById("alarmContainer").style.display = "none"
            document.getElementById("bell").style.display = 'block'
            var userMin = document.getElementById("mm").value
            var userHour = document.getElementById("hh").value
            var userAm_pm = document.getElementById("am_pm").value
            // console.log(userHour,userMin,userAm_pm + " user")
            // console.log(hh,mm,am_pm + " sys")
            if(userHour == hh && userMin == mm && userAm_pm == am_pm)
            {
                // console.log("play")
                audio.play();
                audio.loop = Infinity;
            }
            else
            {
                // console.log("pause")
                audio.pause();
                cleartim1 = 1
            }
            settim1 = setTimeout(setAlarm,1000)
            // console.log(settim1 + "set time out val")
            if(cleartim1 == 1)
            {
                cleartim1 = 0
                // console.log(cleartim1 + "clear time out val in if")
                clearTimeout(settim1)
            }
            // console.log(cleartim1 + "clear time out val")
        }