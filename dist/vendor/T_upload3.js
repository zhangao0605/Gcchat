(function ($) {
    $.Tupload3 = {
        fileNum3: 0,
        uploadFile3: [],
        options3: null,
        init3: function (defaults) {
            this.fileNum3 = defaults;
            this.fileNum3 = defaults.fileNum3;
            this.createHtml3(defaults);
            $(".uploading-img3 li").mouseenter(function () {
                $(this).find(".uploading-tip3").stop().animate({height: '25px'}, 200);
            });
            $(".uploading-img3 li").mouseleave(function () {
                $(this).find(".uploading-tip3").stop().animate({height: '0'}, 200);
            });
            this.photoImg3();
        },
        photoImg3: function () {
            var photoImg3H = $('.uploading-imgBg3').height();
            var ImgH = $('.uploading-imgBg3 img').height();
            if (ImgH > photoImg3H) {
                $('.uploading-imgBg3 img').addClass('cur');
            } else {
                $('.uploading-imgBg3 img').removeClass('cur');
            }
        },
        createHtml3: function (defaults) {
            var fileNum3 = defaults.fileNum3, title = defaults.title3, divId = defaults.divId3,
                accept = defaults.accept3;
            var html = "";
            if (fileNum3 < 0 && fileNum3 == null) {
                fileNum3 = 5;
            }
            html += '<div class="uploading-img3">';
            html += '<p>' + title == '' ? '宝贝图片大小不能超过500kb,为使避免图片上传出现问题，请尽量选择完毕图片后再上传' : title + '</p>';
            html += '<input type="hidden" id="fileNum3" value="0">';
            html += '<ul>';

            for (var i = 0; i < fileNum3; i++) {
                html += '<li>';
                html += '<div class="uploading-imgBg3">';
                html += '<img id="img_src3' + i + '" class="upload_image3" src="images/imgadd.png"/>';
                html += '</div>';
                html += '<p id="uploadProgress3_' + i + '" class="uploadProgress3"></p>';
                html += '<p id="uploadTure3_' + i + '" class="uploadTrue3"></p>';
                html += '<div id="uploading-tip3' + i + '" class="uploading-tip3" style="display: none">';
                html += '<i class="onDelPic3" data="' + i + '">x</i>';
                html += '</div></li>';
            }
            html += '</ul>';


            html += '<div class="andArea3">';
            html += '<div class="filePicker3">上传图片</div>';
            html += '<input id="fileImage3" name="fileImage3" type="file" multiple accept=' + accept + '>';
            html += '</div>';

            html += '</div>';

            $("#" + divId).html(html);
        },
        imgLoad3: function (i, file) {
            var r = new FileReader();
            r.readAsDataURL(file);
            $(r).load(function () {
                while (true) {
                    if ($("#img_src3" + i).attr("src") != "images/imgadd.png") {
                        i++;
                    } else {
                        break;
                    }
                }
                arrFile4[i] = file;
                $("#img_src3" + i).attr("src", this.result);
                $("#uploading-tip3" + i).show();
                $.Tupload3.setphotoImg3();
            });
        },
        setphotoImg3: function () {
            var divH = $('.uploading-imgBg3').height(); //获取容器高度
            var img = $('.uploading-imgBg3 img');
            for (var i = 0; i < img.length; i++) {
                var H = $('.uploading-imgBg3 img').eq(i).height();
                if (H > divH) {
                    //当图片高度大于容器高度时
                    //$('.uploading-imgBg img:eq('+i+')').css('margin-top',-(H-divH)/2+"px");
                } else {
                    $('.uploading-imgBg3 img:eq(' + i + ')').css('margin-top', (divH - H) / 2 + "px");
                }
            }
        },
        onLandR3: function (flag, i) {
            i = parseInt(i);
            if (flag == 'left2') {
                if (i != 0) {
                    var temp = $("#img_src3" + i).attr("src");
                    $("#img_src3" + i).attr("src", $("#img_src3" + (i - 1)).attr("src"));
                    $("#img_src3" + (i - 1)).attr("src", temp);

                    var temp = $("#img_src3" + i).attr("value");
                    $("#img_src3" + i).attr("value", $("#img_src3" + (i - 1)).attr("value"));
                    $("#img_src3" + (i - 1)).attr("value", temp);

                    var tempFile = arrFile4[i];
                    arrFile4[i] = arrFile4[i - 1];
                    arrFile4[i - 1] = tempFile;

                    var tp1 = $("#uploadTure3_" + i).css("display")
                    var tp2 = $("#uploadTure3_" + (i - 1)).css("display")
                    if (tp1 == 'none') {
                        $("#uploadTure3_" + (i - 1)).hide();
                    } else {
                        $("#uploadTure3_" + (i - 1)).show();
                    }
                    if (tp2 == 'none' || tp2 == undefined) {
                        $("#uploadTure3_" + i).hide();
                    } else {
                        $("#uploadTure3_" + i).show();
                    }

                    var tip1 = $("#uploading-tip3" + i).css("display");
                    var tip2 = $("#uploading-tip3" + (i - 1)).css("display");
                    if (tip1 == 'none') {
                        $("#uploading-tip3" + (i - 1)).hide();
                    } else {
                        $("#uploading-tip3" + (i - 1)).show();
                    }
                    if (tip2 == 'none' || tip2 == undefined) {
                        $("#uploading-tip3" + i).hide();
                    } else {
                        $("#uploading-tip3" + i).show();
                    }
                }
            } else {
                if (i != ($.Tupload3.fileNum3 - 1)) {
                    var temp = $("#img_src3" + i).attr("src");
                    $("#img_src3" + i).attr("src", $("#img_src3" + (i + 1)).attr("src"));
                    $("#img_src3" + (i + 1)).attr("src", temp);

                    var temp1 = $("#img_src3" + i).attr("value");
                    $("#img_src3" + i).attr("value", $("#img_src3" + (i + 1)).attr("value"));
                    $("#img_src3" + (i + 1)).attr("value", temp1);

                    var tempFile = arrFile4[i];
                    arrFile4[i] = arrFile4[i + 1];
                    arrFile4[i + 1] = tempFile;

                    var tp1 = $("#uploadTure3_" + i).css("display");
                    var tp2 = $("#uploadTure3_" + (i + 1)).css("display");
                    if (tp1 == 'none') {
                        $("#uploadTure3_" + (i + 1)).hide();
                    } else {
                        $("#uploadTure3_" + (i + 1)).show();
                    }
                    if (tp2 == 'none' || tp2 == undefined) {
                        $("#uploadTure3_" + i).hide();
                    } else {
                        $("#uploadTure3_" + i).show();
                    }

                    var tip1 = $("#uploading-tip3" + i).css("display");
                    var tip2 = $("#uploading-tip3" + (i + 1)).css("display");
                    if (tip1 == 'none') {
                        $("#uploading-tip3" + (i + 1)).hide();
                    } else {
                        $("#uploading-tip3" + (i + 1)).show();
                    }
                    if (tip2 == 'none' || tip2 == undefined) {
                        $("#uploading-tip3" + i).hide();
                    } else {
                        $("#uploading-tip3" + i).show();
                    }
                }
            }
            $.Tupload3.setphotoImg3();
        },
        formUpload3: function (i, fileObj, FileController) {
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
                    $("#img_src3"+i).attr('value',temp.fileName);
                    $("#img_src3"+i).attr('name',"upload_img");
                    $("#uploadProgress3_"+i).hide();
                    $("#uploadTure_"+i).show();
                }*/
                arrFile4[i] = '';
                $.Tupload3.onSuccess3(data, i);
                $("#uploadProgress3_" + i).hide();
                $("#uploadTure3_" + i).show();

            };
            xhr.send(form);
        },
        onSuccess3: function (data, i) {
            return $.Tupload3.fileNum3.onSuccess3(data, i);
        },
        onDelete3: function (i) {
            $.Tupload3.fileNum3.onDelete3(i);
            $("#uploadTure3_" + i).hide();
            $("#img_src3" + i).attr("value", "");
            $("#img_src3" + i).attr('name', "");
            var num = parseInt($("#fileNum3").val()) - 1;
            $("#fileNum3").val(num);
            $("#fileText").val("选中" + num + "个文件");
            arrFile4[i] = '';
            $("#img_src3" + i).attr("src", "images/imgadd.png");
            $("#uploading-tip3" + i).hide();
            $.Tupload3.setphotoImg3();
        }
    }
})(jQuery);
var arrFile4 = [];
$(document).on('change', '#fileImage3', function () {
    console.log('1111')
    var num = parseInt($("#fileNum3").val()) + parseInt(this.files.length);
    if (num < $.Tupload3.fileNum3 + 1) {
        $("#fileNum3").val(num);
        $("#fileText").val("选中" + num + "张文件");
        for (var i = 0; i < num; i++) {
            for (var j = 0; j < num; j++) {
                if ($("#img_src3" + j).attr("src") == "images/imgadd.png") {
                    if (this.files.length - 1 < i) {
                        break;
                    } else {
                        $.Tupload3.imgLoad3(i, this.files[i]);
                        break;
                    }
                }
            }

        }
    } else if (num > 2) {
        $('.page1-alert-small-danger').show(300).find('.page1-alert-small-danger-con').html("&nbsp;&nbsp;单次只能上传" + $.Tupload3.fileNum3 + "张图片");
        setTimeout(function () {
            $('.page1-alert-small-danger').hide(300)
        }, 2000)
    }
})
$(document).on('click', '.onDelPic3', function () {
    var haha = $(this).attr('data')
    $("#uploadTure3_" + haha).hide();
    $("#img_src3" + haha).attr("value", "");
    $("#img_src3" + haha).attr('name', "");
    var num = parseInt($("#fileNum3").val()) - 1;
    $("#fileNum3").val(num);
    arrFile4[haha] = '';
    $("#img_src3" + haha).attr("src", "images/imgadd.png");
    $("#uploading-tip3" + haha).hide();
    $.Tupload3.setphotoImg3();


});
$(document).on('click', '.onLandR3', function () {
    var data = $(this).attr("data").split(",");
    $.Tupload3.onLandR3(data[0], data[1]);
});