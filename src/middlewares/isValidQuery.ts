import express from 'express';

//check if queries have valid values

/* 
image object {
  filename: imageName,
  ext: 'jpg',
  width: 200,
  height:200,
  path: imageName-200X200.jpg
}
*/

//filename and width are mandatory
const isValidQuery = function (req: express.Request, res: express.Response, next: express.NextFunction): void {
  const filename = req.query.filename as string;
  const width = +(req.query.width as unknown as number);

  if (filename && width) {
    const height = req.query.height ? +(req.query.height as unknown as number) : width;
    let [name, ext] = filename.toLowerCase().split('.');
    ext = ext ? ext : 'jpg';

    //added to custom type
    req.image = {
      filename: name,
      width,
      height,
      ext,
      path: `${name}-${width}X${height}.${ext}`,
      isExist: false,
    };
    next();
  } else res.status(400).send('BAD REQUEST: Check Endpoint Queries');
};

export default isValidQuery;
