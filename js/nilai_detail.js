
$(document).ready(function () {
    //nilai
    $('.calculateSidang1').keyup(function () {
        HitungNilaiSidang1();
    });
    $('.calculateSidang2').keyup(function () {
        HitungNilaiSidang2();
    });
    $('.calculateSidang3').keyup(function () {
        HitungNilaiSidang3();
    });
});

function HitungNilaiSidang1() {
    var tempNilaiAkhir = 0;
    var tempNilai1 = 0;
    var tempNilai2 = 0;
    var tempNilai3 = 0;
    var tempNilai4 = 0;

    $(".calculateSidang1").each(function () {
        var nilai1 = parseFloat($('#nilai1Sidang1').val());

        var nilai2a = parseFloat($('#nilai2aSidang1').val());
        var nilai2b = parseFloat($('#nilai2bSidang1').val());

        var nilai3a = parseFloat($('#nilai3aSidang1').val());
        var nilai3b = parseFloat($('#nilai3bSidang1').val());
        var nilai3c = parseFloat($('#nilai3cSidang1').val());
        var nilai3d = parseFloat($('#nilai3dSidang1').val());
        var nilai3e = parseFloat($('#nilai3eSidang1').val());
        var nilai3f = parseFloat($('#nilai3fSidang1').val());

        var nilai4a = parseFloat($('#nilai4aSidang1').val());
        var nilai4b = parseFloat($('#nilai4bSidang1').val());

        tempNilai1 = nilai1;
        tempNilai2 = (nilai2a + nilai2b) / 2;
        tempNilai3 = (nilai3a + nilai3b + nilai3c + nilai3d + nilai3e + nilai3f) / 6;
        tempNilai4 = (nilai4a + nilai4b) / 2;

        if ($.isNumeric(tempNilai1)
                && $.isNumeric(tempNilai2)
                && $.isNumeric(tempNilai3)
                && $.isNumeric(tempNilai4)) {


            tempNilaiAkhir = (parseFloat(tempNilai1) * 10 / 100) +
                    (parseFloat(tempNilai2) * 20 / 100) +
                    (parseFloat(tempNilai3) * 60 / 100) +
                    (parseFloat(tempNilai4) * 10 / 100);
        }
        $('#nilai2totalSidang1').val(tempNilai2.toFixed(1));
        $('#nilai3totalSidang1').val(tempNilai3.toFixed(1));
        $('#nilai4totalSidang1').val(tempNilai4.toFixed(1));
        $('#nilaiAkhirSidang1').val(tempNilaiAkhir.toFixed(1));
    });
}

function HitungNilaiSidang2() {

}

function HitungNilaiSidang3() {

}