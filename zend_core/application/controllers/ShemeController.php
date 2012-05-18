<?php

class ShemeController extends Zend_Controller_Action
{

    /**
     * @var Bisna\Application\Container\DoctrineContainer
     */
    protected $doctrine;

    /**
     * @var Doctrine\ORM\EntityManager
     */
    protected $entityManager;

    /**
     * @var NOLASnowball\Entity\Repository\StandRepository
     */
    protected $standRepository;

    public function init()
    {
        $this->doctrine = Zend_Registry::get('doctrine');
        $this->entityManager = $this->doctrine->getEntityManager();
        $this->standRepository = $this->entityManager->getRepository('\NOLASnowball\Entity\Stand');
    }

    public function indexAction()
    {
        //$this->_forward('list');
    }
    

   
    public function editAction()
    {
        $this->view->pageTitle="Редактор";
    }
}

