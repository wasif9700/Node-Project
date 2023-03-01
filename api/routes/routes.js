const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')
const imagecontroller = require('../controller/fileController')
const loginMiddleware = require('../middleware/loginMiddleware')
const multer = require('../middleware/multerMiddleware')

router.post('/login',userController.login)
router.post('/signup',multer.upload,userController.signup)
router.get('/getusers',userController.showusers)
router.get('/getoneuser',loginMiddleware.isLogin,userController.showuser)
router.patch('/update',loginMiddleware.isLogin,userController.updateuser)
router.delete('/delete',loginMiddleware.isLogin,userController.deleteuser)
router.post('/uploadimg',loginMiddleware.isLogin,multer.upload,userController.uploadimg)

// router.get('/getdetail',loginMiddleware.isLogin,userController.getDetail)

router.post('/upload',loginMiddleware.isLogin,multer.upload,imagecontroller.fileUpload)
router.get('/getimage',loginMiddleware.isLogin,imagecontroller.getimage)
router.delete('/deleteimg',loginMiddleware.isLogin,imagecontroller.deleteimg)

module.exports = router