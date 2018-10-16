app.directive('uploadFile4', function () {
    return {
        link: function (scope, elem) {
            elem.on("change", function () {
                scope.upFile1 = this.files[0];
                if (scope.upFile1.name.length >= 6) {

                    $('.exselTextGra1').html(scope.upFile1.name.slice(0,6) + '...')
                } else {
                    $('.exselTextGra1').html(scope.upFile1.name)
                }
                $('.exselTextGray1').html((scope.upFile1.size / 1024).toFixed(2) + 'kb')
                $('.Importphrase-con-second-donwload-null').css('display', 'none').html(' 请上传文件')
            });
        }
    }
});
