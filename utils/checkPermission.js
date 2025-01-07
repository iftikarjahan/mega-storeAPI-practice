const { UnauthorizedError } = require("../errors");

const checkPermission = (requestUser, requestedResource) => {
  // console.log(requestUser);
  // console.log(requestedResource);
  // console.log(typeof(requestUser));
  // console.log(typeof(requestedResource));

  /*
    ->I need to perform 2 checks
        1.If the requestUser is an admin or not. If he is an admin, then no issue
        2.If the requestUser is asking for itself, then no issue
    */
  if (requestUser.role === "admin") return;
  if (requestUser.id === requestedResource.toString()) return;
  throw new UnauthorizedError(
    "Not allowed to get the user. You are not the admin"
  );
};

module.exports = checkPermission;

