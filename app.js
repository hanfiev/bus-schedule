var origin = '';
var destination = '';
var currentID = '';
var currentIDfil = '';
var today = '';
var h = '';
var m = '';
var s = '';
var activeList = '';
var activeListdua = '';

function startTime() {
    today = new Date();
    h = today.getHours();
    m = today.getMinutes();
    s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
        h + ":" + m + ":" + s;
    currentID = h.toString() + m.toString();
    currentIDfil = Math.floor(currentID)
    setTimeout(startTime, 500); //repeat the function after 500ms
    setTimeout(loadJSON, 500);
    setTimeout(nextSchedule, 2000);
    setTimeout(tableBuild,2000);


}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}
var scheduleData = '';

function loadJSON() {
    $.getJSON('schedule.json', function (data) {
        scheduleData = data.schedule

        var fil = function (val) {
            return val.id > currentIDfil;
        };
        activeList = scheduleData.filter(fil);

    });

}

function testfunction() {
    origin = document.getElementById("origin").value;
    destination = document.getElementById("destination").value;
    document.getElementById('from').innerHTML = '<p class="m-0 text-center">' + origin + '</p>';
    document.getElementById('to').innerHTML = '<p class="m-0 text-center">' + destination + '</p>';

    document.getElementById('arrow').style.visibility = "visible";

    var originIndex = activeList.findIndex(img => img.stop == origin);
    var destVal = activeList.map(function (e) { //buat validasi jadwal buat ke desitinasi dia masih ada ga.
        return e.stop;
    }).indexOf(destination, originIndex + 1); //E ini direplace sama destination, kalo hasilnya -1 bilang udah ga ada jadwal lagi. else tunjukin appnya. 

    if (destVal < 0) {
        document.getElementById('timeArrived').innerHTML = "";
        document.getElementById('time').innerHTML = "";
        document.getElementById('message').innerHTML = '<p class="m-0 text-center">There is no bus in service</p>';


    } else {
        document.getElementById('time').innerHTML = '<p class="m-0 text-center">' + activeList[originIndex].time + '</p>';
        document.getElementById('timeArrived').innerHTML = '<p class="m-0 text-center">' + activeList[destVal].time + '</p>';
    }
}


function nextSchedule() {
    document.getElementById('nextBus').innerHTML = "Bus: " + activeList[0].bus;
    document.getElementById('nextOrigin').innerHTML = "Route: " + activeList[0].stop + " to " + activeList[1].stop
    document.getElementById('nextTime').innerHTML = "ETA: " + activeList[1].time;
}

//table
setTimeout(tableBuild, 3000)

function tableBuild() {
    var k = '<tbody>'
    for (i = 0; i < activeList.length; i++) {
        k += '<tr>';
        k += '<td>' + activeList[i].stop + '</td>';
        k += '<td>' + activeList[i].time + '</td>';
        k += '<td>' + activeList[i].bus + '</td>';
        k += '</tr>';
    }
    k += '</tbody>';
    document.getElementById('tableData').innerHTML = k;
}