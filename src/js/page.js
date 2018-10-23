import $ from 'jquery'

const page = {
    renderNavBar: function () {
        $.get({
            url: '../html/nav.html',
            success: function (data) {
                $("body").prepend(data);
            }
        })
    },
    
    renderFooter: function () {
        
    }
};
export default page;