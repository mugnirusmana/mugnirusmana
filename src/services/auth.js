let myPromise = new Promise(function (myResolve, myReject) {
  myResolve({
    data: {},
    meta: { status: true, code: 200, message: "Success!" },
  });
});

export const signIn = (params) => {
  return myPromise;
};
