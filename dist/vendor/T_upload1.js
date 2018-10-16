(function ($) {
    $.Tupload1 = {
        fileNum1: 0,
        uploadFile1: [],
        options1: null,
        init1: function (defaults) {
            this.options1 = defaults;
            this.fileNum1 = defaults.fileNum1;
            this.createHtml1(defaults);
            $(".uploading-img1 li").mouseenter(function () {
                $(this).find(".uploading-tip1").stop().animate({height: '25px'}, 200);
            });
            $(".uploading-img1 li").mouseleave(function () {
                $(this).find(".uploading-tip1").stop().animate({height: '0'}, 200);
            });
            this.photoImg1();
        },
        photoImg1: function () {
            var photoImg1H = $('.uploading-imgBg1').height();
            var ImgH = $('.uploading-imgBg1 img').height();
            if (ImgH > photoImg1H) {
                $('.uploading-imgBg1 img').addClass('cur');
            } else {
                $('.uploading-imgBg1 img').removeClass('cur');
            }
        },
        createHtml1: function (defaults) {
            var fileNum1 = defaults.fileNum1, title = defaults.title1, divId = defaults.divId1, accept = defaults.accept1;
            var html = "";
            if (fileNum1 < 0 && fileNum1 == null) {
                fileNum1 = 5;
            }
            html += '<div class="uploading-img1">';
            html += '<p>' + title == '' ? '宝贝图片大小不能超过500kb,为使避免图片上传出现问题，请尽量选择完毕图片后再上传' : title + '</p>';
            html += '<input type="hidden" id="fileNum1" value="0">';
            html += '<ul>';

            for (var i = 0; i < fileNum1; i++) {
                html += '<li>';
                html += '<div class="uploading-imgBg1">';
                html += '<img id="img_src1' + i + '" class="upload_image1" src="images/imgadd.png"/>';
                html += '</div>';
                html += '<p id="uploadProgress1_' + i + '" class="uploadProgress1"></p>';
                html += '<p id="uploadTure1_' + i + '" class="uploadTrue1"></p>';
                html += '<div id="uploading-tip1' + i + '" class="uploading-tip1" style="display: none">';
                html += '<span class="onLandR1" data="left1,' + i + '" ><</span>';
                html += '<span class="onLandR1" data="rigth1,' + i + '" >></span>';
                html += '<i class="onDelPic1" data="' + i + '">x</i>';
                html += '</div></li>';
            }
            html += '</ul>';


            html += '<div class="andArea1">';
            html += '<div class="filePicker1">上传图片</div>';
            html += '<input id="fileImage1" name="fileImage1" type="file" multiple accept=' + accept + '>';
            html += '</div>';

            html += '</div>';

            $("#" + divId).html(html);
        },
        imgLoad1: function (i, file) {
            var r = new FileReader();
            r.readAsDataURL(file);
            $(r).load(function () {
                while (true) {
                    if ($("#img_src1" + i).attr("src") != "images/imgadd.png") {
                        i++;
                    } else {
                        break;
                    }
                }
                arrFile1[i] = file;
                $("#img_src1" + i).attr("src", this.result);
                $("#uploading-tip1" + i).show();
                $.Tupload1.setphotoImg1();
            });
        },
        setphotoImg1: function () {
            var divH = $('.uploading-imgBg1').height(); //获取容器高度
            var img = $('.uploading-imgBg1 img');
            for (var i = 0; i < img.length; i++) {
                var H = $('.uploading-imgBg1 img').eq(i).height();
                if (H > divH) {
                    //当图片高度大于容器高度时
                    //$('.uploading-imgBg img:eq('+i+')').css('margin-top',-(H-divH)/2+"px");
                } else {
                    $('.uploading-imgBg1 img:eq(' + i + ')').css('margin-top', (divH - H) / 2 + "px");
                }
            }
        },
        onLandR1: function (flag, i) {
            i = parseInt(i);
            if (flag == 'left1') {
                if (i != 0) {
                    var temp = $("#img_src1" + i).attr("src");
                    $("#img_src1" + i).attr("src", $("#img_src1" + (i - 1)).attr("src"));
                    $("#img_src1" + (i - 1)).attr("src", temp);

                    var temp = $("#img_src1" + i).attr("value");
                    $("#img_src1" + i).attr("value", $("#img_src1" + (i - 1)).attr("value"));
                    $("#img_src1" + (i - 1)).attr("value", temp);

                    var tempFile = arrFile1[i];
                    arrFile1[i] = arrFile1[i - 1];
                    arrFile1[i - 1] = tempFile;

                    var tp1 = $("#uploadTure1_" + i).css("display")
                    var tp2 = $("#uploadTure1_" + (i - 1)).css("display")
                    if (tp1 == 'none') {
                        $("#uploadTure1_" + (i - 1)).hide();
                    } else {
                        $("#uploadTure1_" + (i - 1)).show();
                    }
                    if (tp2 == 'none' || tp2 == undefined) {
                        $("#uploadTure1_" + i).hide();
                    } else {
                        $("#uploadTure1_" + i).show();
                    }

                    var tip1 = $("#uploading-tip1" + i).css("display");
                    var tip2 = $("#uploading-tip1" + (i - 1)).css("display");
                    if (tip1 == 'none') {
                        $("#uploading-tip1" + (i - 1)).hide();
                    } else {
                        $("#uploading-tip1" + (i - 1)).show();
                    }
                    if (tip2 == 'none' || tip2 == undefined) {
                        $("#uploading-tip1" + i).hide();
                    } else {
                        $("#uploading-tip1" + i).show();
                    }
                }
            } else {
                if (i != ($.Tupload1.fileNum1 - 1)) {
                    var temp = $("#img_src1" + i).attr("src");
                    $("#img_src1" + i).attr("src", $("#img_src1" + (i + 1)).attr("src"));
                    $("#img_src1" + (i + 1)).attr("src", temp);

                    var temp1 = $("#img_src1" + i).attr("value");
                    $("#img_src1" + i).attr("value", $("#img_src1" + (i + 1)).attr("value"));
                    $("#img_src1" + (i + 1)).attr("value", temp1);

                    var tempFile = arrFile1[i];
                    arrFile1[i] = arrFile1[i + 1];
                    arrFile1[i + 1] = tempFile;

                    var tp1 = $("#uploadTure1_" + i).css("display");
                    var tp2 = $("#uploadTure1_" + (i + 1)).css("display");
                    if (tp1 == 'none') {
                        $("#uploadTure1_" + (i + 1)).hide();
                    } else {
                        $("#uploadTure1_" + (i + 1)).show();
                    }
                    if (tp2 == 'none' || tp2 == undefined) {
                        $("#uploadTure1_" + i).hide();
                    } else {
                        $("#uploadTure1_" + i).show();
                    }

                    var tip1 = $("#uploading-tip1" + i).css("display");
                    var tip2 = $("#uploading-tip1" + (i + 1)).css("display");
                    if (tip1 == 'none') {
                        $("#uploading-tip1" + (i + 1)).hide();
                    } else {
                        $("#uploading-tip1" + (i + 1)).show();
                    }
                    if (tip2 == 'none' || tip2 == undefined) {
                        $("#uploading-tip1" + i).hide();
                    } else {
                        $("#uploading-tip1" + i).show();
                    }
                }
            }
            $.Tupload1.setphotoImg1();
        },
        formUpload1: function (i, fileObj, FileController) {
            // FormData 对象
            var form = new FormData();
            form.append("author", "hooyes");                        // 可以增加表单数据
            form.append("file", fileObj);                           // 文件对象

            // XMLHttpRequest 对象
            var xhr = new XMLHttpRequest();
            xhr.open("post", FileController, true);
            xhr.onload = function (data) {
                /*var temp =eval('(' + data.currentTarget.response + ')')
                if(temp.fileName != undefined){
                    $("#img_src1"+i).attr('value',temp.fileName);
                    $("#img_src1"+i).attr('name',"upload_img");
                    $("#uploadProgress1_"+i).hide();
                    $("#uploadTure_"+i).show();
                }*/
                arrFile1[i] = '';
                $.Tupload1.onSuccess1(data, i);
                $("#uploadProgress1_" + i).hide();
                $("#uploadTure1_" + i).show();

            };
            xhr.send(form);
        },
        onSuccess1: function (data, i) {
            return $.Tupload1.options1.onSuccess1(data, i);
        },
        onDelete1: function (i) {
            $.Tupload1.options1.onDelete1(i);
            $("#uploadTure1_" + i).hide();
            $("#img_src1" + i).attr("value", "");
            $("#img_src1" + i).attr('name', "");
            var num = parseInt($("#fileNum1").val()) - 1;
            $("#fileNum1").val(num);
            $("#fileText").val("选中" + num + "个文件");
            arrFile1[i] = '';
            $("#img_src1" + i).attr("src", "images/imgadd.png");
            $("#uploading-tip1" + i).hide();
            $.Tupload1.setphotoImg1();
        }
    }
})(jQuery);
var arrFile1 = [];
$(document).on('change', '#fileImage1', function () {
    var num = parseInt($("#fileNum1").val()) + parseInt(this.files.length);
    if (num < $.Tupload1.fileNum1 + 1) {
        $("#fileNum1").val(num);
        $("#fileText").val("选中" + num + "张文件");
        for (var i = 0; i < num; i++) {
            for (var j = 0; j < num; j++) {
                if ($("#img_src1" + j).attr("src") == "images/imgadd.png") {
                    if (this.files.length - 1 < i) {
                        break;
                    } else {
                        $.Tupload1.imgLoad1(i, this.files[i]);
                        break;
                    }
                }
            }

        }
    } else {
        $('.page1-alert-small-danger').show(300).find('.page1-alert-small-danger-con').html("&nbsp;&nbsp;单次只能上传" + $.Tupload1.fileNum1 + "张图片");
        setTimeout(function () {
            $('.page1-alert-small-danger').hide(300)
        }, 2000)
    }
})
$(document).on('click', '.onDelPic1', function () {
    var haha = $(this).attr('data')
    $("#uploadTure1_" + haha).hide();
    $("#img_src1" + haha).attr("value", "");
    $("#img_src1" + haha).attr('name', "");
    var num = parseInt($("#fileNum1").val()) - 1;
    $("#fileNum1").val(num);
    arrFile1[haha] = '';
    $("#img_src1" + haha).attr("src", "images/imgadd.png");
    $("#uploading-tip1" + haha).hide();
    $.Tupload1.setphotoImg1();


});
$(document).on('click', '.onLandR1', function () {
    var data = $(this).attr("data").split(",");
    $.Tupload1.onLandR1(data[0], data[1]);
});