<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
       $this->view->pageTitle="Галлерея";
      
    }
    public function infoAction()
    {
        // action body
       $this->view->pageTitle="О нас";
      
    }

}





