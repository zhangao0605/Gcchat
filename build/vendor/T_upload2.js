(function ($) {
    $.Tupload2 = {
        fileNum2: 0,
        uploadFile2: [],
        options2: null,
        init2: function (defaults) {
            this.fileNum2 = defaults;
            this.fileNum2 = defaults.fileNum2;
            this.createHtml2(defaults);
            $(".uploading-img2 li").mouseenter(function () {
                $(this).find(".uploading-tip2").stop().animate({height: '25px'}, 200);
            });
            $(".uploading-img2 li").mouseleave(function () {
                $(this).find(".uploading-tip2").stop().animate({height: '0'}, 200);
            });
            this.photoImg2();
        },
        photoImg2: function () {
            var photoImg2H = $('.uploading-imgBg2').height();
            var ImgH = $('.uploading-imgBg2 img').height();
            if (ImgH > photoImg2H) {
                $('.uploading-imgBg2 img').addClass('cur');
            } else {
                $('.uploading-imgBg2 img').removeClass('cur');
            }
        },
        createHtml2: function (defaults) {
            var fileNum2 = defaults.fileNum2, title = defaults.title2, divId = defaults.divId2, accept = defaults.accept2;
            var html = "";
            if (fileNum2 < 0 && fileNum2 == null) {
                fileNum2 = 5;
            }
            html += '<div class="uploading-img2">';
            html += '<p>' + title == '' ? '宝贝图片大小不能超过500kb,为使避免图片上传出现问题，请尽量选择完毕图片后再上传' : title + '</p>';
            html += '<input type="hidden" id="fileNum2" value="0">';
            html += '<ul>';

            for (var i = 0; i < fileNum2; i++) {
                html += '<li>';
                html += '<div class="uploading-imgBg2">';
                html += '<img id="img_src2' + i + '" class="upload_image2" src="images/imgadd.png"/>';
                html += '</div>';
                html += '<p id="uploadProgress2_' + i + '" class="uploadProgress2"></p>';
                html += '<p id="uploadTure2_' + i + '" class="uploadTrue2"></p>';
                html += '<div id="uploading-tip2' + i + '" class="uploading-tip2" style="display: none">';
                html += '<i class="onDelPic2" data="' + i + '">x</i>';
                html += '</div></li>';
            }
            html += '</ul>';


            html += '<div class="andArea2">';
            html += '<div class="filePicker2">上传图片</div>';
            html += '<input id="fileImage2" name="fileImage2" type="file" multiple accept=' + accept + '>';
            html += '</div>';

            html += '</div>';

            $("#" + divId).html(html);
        },
        imgLoad2: function (i, file) {
            var r = new FileReader();
            r.readAsDataURL(file);
            $(r).load(function () {
                while (true) {
                    if ($("#img_src2" + i).attr("src") != "images/imgadd.png") {
                        i++;
                    } else {
                        break;
                    }
                }
                arrFile3[i] = file;
                $("#img_src2" + i).attr("src", this.result);
                $("#uploading-tip2" + i).show();
                $.Tupload2.setphotoImg2();
            });
        },
        setphotoImg2: function () {
            var divH = $('.uploading-imgBg2').height(); //获取容器高度
            var img = $('.uploading-imgBg2 img');
            for (var i = 0; i < img.length; i++) {
                var H = $('.uploading-imgBg2 img').eq(i).height();
                if (H > divH) {
                    //当图片高度大于容器高度时
                    //$('.uploading-imgBg img:eq('+i+')').css('margin-top',-(H-divH)/2+"px");
                } else {
                    $('.uploading-imgBg2 img:eq(' + i + ')').css('margin-top', (divH - H) / 2 + "px");
                }
            }
        },
        onLandR2: function (flag, i) {
            i = parseInt(i);
            if (flag == 'left2') {
                if (i != 0) {
                    var temp = $("#img_src2" + i).attr("src");
                    $("#img_src2" + i).attr("src", $("#img_src2" + (i - 1)).attr("src"));
                    $("#img_src2" + (i - 1)).attr("src", temp);

                    var temp = $("#img_src2" + i).attr("value");
                    $("#img_src2" + i).attr("value", $("#img_src2" + (i - 1)).attr("value"));
                    $("#img_src2" + (i - 1)).attr("value", temp);

                    var tempFile = arrFile3[i];
                    arrFile3[i] = arrFile3[i - 1];
                    arrFile3[i - 1] = tempFile;

                    var tp1 = $("#uploadTure2_" + i).css("display")
                    var tp2 = $("#uploadTure2_" + (i - 1)).css("display")
                    if (tp1 == 'none') {
                        $("#uploadTure2_" + (i - 1)).hide();
                    } else {
                        $("#uploadTure2_" + (i - 1)).show();
                    }
                    if (tp2 == 'none' || tp2 == undefined) {
                        $("#uploadTure2_" + i).hide();
                    } else {
                        $("#uploadTure2_" + i).show();
                    }

                    var tip1 = $("#uploading-tip2" + i).css("display");
                    var tip2 = $("#uploading-tip2" + (i - 1)).css("display");
                    if (tip1 == 'none') {
                        $("#uploading-tip2" + (i - 1)).hide();
                    } else {
                        $("#uploading-tip2" + (i - 1)).show();
                    }
                    if (tip2 == 'none' || tip2 == undefined) {
                        $("#uploading-tip2" + i).hide();
                    } else {
                        $("#uploading-tip2" + i).show();
                    }
                }
            } else {
                if (i != ($.Tupload2.fileNum2 - 1)) {
                    var temp = $("#img_src2" + i).attr("src");
                    $("#img_src2" + i).attr("src", $("#img_src2" + (i + 1)).attr("src"));
                    $("#img_src2" + (i + 1)).attr("src", temp);

                    var temp1 = $("#img_src2" + i).attr("value");
                    $("#img_src2" + i).attr("value", $("#img_src2" + (i + 1)).attr("value"));
                    $("#img_src2" + (i + 1)).attr("value", temp1);

                    var tempFile = arrFile3[i];
                    arrFile3[i] = arrFile3[i + 1];
                    arrFile3[i + 1] = tempFile;

                    var tp1 = $("#uploadTure2_" + i).css("display");
                    var tp2 = $("#uploadTure2_" + (i + 1)).css("display");
                    if (tp1 == 'none') {
                        $("#uploadTure2_" + (i + 1)).hide();
                    } else {
                        $("#uploadTure2_" + (i + 1)).show();
                    }
                    if (tp2 == 'none' || tp2 == undefined) {
                        $("#uploadTure2_" + i).hide();
                    } else {
                        $("#uploadTure2_" + i).show();
                    }

                    var tip1 = $("#uploading-tip2" + i).css("display");
                    var tip2 = $("#uploading-tip2" + (i + 1)).css("display");
                    if (tip1 == 'none') {
                        $("#uploading-tip2" + (i + 1)).hide();
                    } else {
                        $("#uploading-tip2" + (i + 1)).show();
                    }
                    if (tip2 == 'none' || tip2 == undefined) {
                        $("#uploading-tip2" + i).hide();
                    } else {
                        $("#uploading-tip2" + i).show();
                    }
                }
            }
            $.Tupload2.setphotoImg2();
        },
        formUpload2: function (i, fileObj, FileController) {
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
                    $("#img_src2"+i).attr('value',temp.fileName);
                    $("#img_src2"+i).attr('name',"upload_img");
                    $("#uploadProgress2_"+i).hide();
                    $("#uploadTure_"+i).show();
                }*/
                arrFile3[i] = '';
                $.Tupload2.onSuccess2(data, i);
                $("#uploadProgress2_" + i).hide();
                $("#uploadTure2_" + i).show();

            };
            xhr.send(form);
        },
        onSuccess2: function (data, i) {
            return $.Tupload2.fileNum2.onSuccess2(data, i);
        },
        onDelete2: function (i) {
            $.Tupload2.fileNum2.onDelete2(i);
            $("#uploadTure2_" + i).hide();
            $("#img_src2" + i).attr("value", "");
            $("#img_src2" + i).attr('name', "");
            var num = parseInt($("#fileNum2").val()) - 1;
            $("#fileNum2").val(num);
            $("#fileText").val("选中" + num + "个文件");
            arrFile3[i] = '';
            $("#img_src2" + i).attr("src", "images/imgadd.png");
            $("#uploading-tip2" + i).hide();
            $.Tupload2.setphotoImg2();
        }
    }
})(jQuery);
var arrFile3 = [];
$(document).on('change', '#fileImage2', function () {
    var num = parseInt($("#fileNum2").val()) + parseInt(this.files.length);
    if (num < $.Tupload2.fileNum2 + 1) {
        $("#fileNum2").val(num);
        $("#fileText").val("选中" + num + "张文件");
        for (var i = 0; i < num; i++) {
            for (var j = 0; j < num; j++) {
                if ($("#img_src2" + j).attr("src") == "images/imgadd.png") {
                    if (this.files.length - 1 < i) {
                        break;
                    } else {
                        $.Tupload2.imgLoad2(i, this.files[i]);
                        break;
                    }
                }
            }

        }
    } else {
        $('.page1-alert-small-danger').show(300).find('.page1-alert-small-danger-con').html("&nbsp;&nbsp;单次只能上传" + $.Tupload2.fileNum2 + "张图片");
        setTimeout(function () {
            $('.page1-alert-small-danger').hide(300)
        }, 2000)
    }
})
$(document).on('click', '.onDelPic2', function () {
    var haha = $(this).attr('data')
    $("#uploadTure2_" + haha).hide();
    $("#img_src2" + haha).attr("value", "");
    $("#img_src2" + haha).attr('name', "");
    var num = parseInt($("#fileNum2").val()) - 1;
    $("#fileNum2").val(num);
    arrFile3[haha] = '';
    $("#img_src2" + haha).attr("src", "images/imgadd.png");
    $("#uploading-tip2" + haha).hide();
    $.Tupload2.setphotoImg2();


});
$(document).on('click', '.onLandR2', function () {
    var data = $(this).attr("data").split(",");
    $.Tupload2.onLandR2(data[0], data[1]);
});