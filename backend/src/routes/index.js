import express from "express"

const router = express.Router()

router.use("/health", (req, res) => {
    return res.sendStatus(200)
})

router.use("/api", router)

export default router
