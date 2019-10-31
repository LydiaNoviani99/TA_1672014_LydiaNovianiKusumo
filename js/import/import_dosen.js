var db = firebase.database();
$(document).ready(function () {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var data = url.searchParams.get("data");
    if (data !== null) {
        var myobj = JSON.parse(data);
        $.each(myobj, function (key) {
            var v_NIK = myobj[key].NIK;
            var v_nama = myobj[key].Nama;
            var v_email = myobj[key].Email;
            var v_IdJabatan = myobj[key].IdJabatan;
            var v_NamaJabatan = myobj[key].NamaJabatan;
//            alert(v_NIK);
//            alert(v_nama);
//            alert(v_email);
//            alert(v_IdJabatan);
//            alert(v_NamaJabatan);
            db.ref('dosen/' + v_NIK).set({
                nik: v_NIK,
                name: v_nama,
                email: v_email,
                id_role: v_IdJabatan,
                nama_role: v_NamaJabatan
            });
            
        });
    }
});
