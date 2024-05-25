router.put("/:id", async (req, res, next) => {
    try {
      const { amt, paid, paidDate } = req.body;
      const { id } = req.params;
  
      const result = await db.query(
        `UPDATE invoices
             SET amt=${amt}, paid=${paid}, paid_date=${paidDate}
             WHERE id=${id}
             RETURNING id, comp_code, amt, paid, add_date, paid_date`
      );
  
      if (result.rows.length === 0) {
        throw new ExpressError(`No such invoice: ${id}`, 404);
      }
  
      return res.json({ invoice: result.rows[0] });
    } catch (err) {
      return next(err);
    }
  });
  
  router.delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const result = await db.query(
        `DELETE FROM invoices
             WHERE id = ${id}
             RETURNING id`
      );
  
      if (result.rows.length === 0) {
        throw new ExpressError(`No such invoice: ${id}`, 404);
      }
  
      return res.json({ status: "deleted" });
    } catch (err) {
      return next(err);
    }
  });
  
  module.exports = router;