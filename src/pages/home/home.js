import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.min'
import page from '../../js/page'
import Vue from 'vue'

let bookVue;
let data = {text: '需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了需要是发大水了'}
$(function () {
    page.renderNavBar();
    page.renderFooter();

    bookVue = new Vue({
        el:'.container',
        data: {
            data: data
        }
    });
})