//настраиваем наш запрос который отвечает за постинг данных
const postData =  async(url, data)=> {
    const res = await fetch(url, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:data
    });
    //и трансформирует обьект в json
    return res.json();
};

//тут не будет вторым аргументом data, потому что мы ничего не отправляем, а только получаем.
const getResource =  async(url,)=> {
    //соответственно обьекта с настройками не будет. Мы просто делаем запрос,дожидаемся его окончания и трансформируем в обьект.
     const res = await fetch(url);
     
      if(!res.ok) {
         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }
     return res.json();
 };




export {postData};
export {getResource};

