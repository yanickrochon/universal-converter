export default (cond, msg) => {
   if (!cond) {
      throw new Error(msg);
   }
};
