router.put("/:code", async (req, res, next) => {
    try {
      const { name, description } = req.body;
      const { code } = req.params;
  
      const result = await db.query(
        `UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING name, description, code`,
        [name, description, code]
      );
  
      if (result.rows.length === 0) {
        throw new ExpressError(`No such company: ${code}`, 404);
      }
  
      return res.json({ company: result.rows[0] });
    } catch (err) {
      return next(err);
    }
  });
  
  router.delete("/:code", async (req, res, next) => {
    try {
      const { code } = req.params;
  
      const result = await db.query(
        `DELETE FROM companies WHERE code=$1 RETURNING code`,
        [code]
      );
  
      if (result.rows.length === 0) {
        throw new ExpressError(`No such company: ${code}`, 404);
      }
  
      return res.json({ status: "deleted" });
    } catch (err) {
      return next(err);
    }
  });
  
  module.exports = router;