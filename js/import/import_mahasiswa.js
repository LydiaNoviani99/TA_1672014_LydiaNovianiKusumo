var db = firebase.database();
$(document).ready(function () {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var data = url.searchParams.get("data");
    if (data !== null) {
        var myobj = JSON.parse(data);
        $.each(myobj, function (key) {
            var v_NRP = myobj[key].nrp;
            var v_name = myobj[key].name;
//            alert(v_NRP);
//            alert(v_name);
            db.ref('mahasiswa/' + v_NRP).set({
                nrp: v_NRP,
                name: v_name
            });

        });
        alert("Import mahasiswa berhasil")
    }
});
