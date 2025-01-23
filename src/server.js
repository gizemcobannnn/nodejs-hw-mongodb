// express sunucusunun çalışma mantığını içerecek.
//setupServer adında bir fonksiyon oluşturun; bu fonksiyon express sunucusunu oluşturacak.
//  Bu fonksiyon şunları içermelidir:
//express() çağrısıyla sunucunun oluşturulması
//cors ve pino logger'ının ayarlanması
//Mevcut olmayan rotalar için 404 hata durumu ve uygun mesaj döndürülmesi.{message: 'Not found'}
// Sunucunun, PORT ortam değişkeni aracılığıyla belirtilen veya belirtilmemişse 3000 numaralı portta başlatılması
//Sunucu başarıyla başlatıldığında konsola “Server is running on port {PORT}” mesajının yazdırılması; burada {PORT} sizin port numaranızdır

import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

export const setupServer = ()=>{
    const server = express();


    const PORT= Number(process.env('PORT'));

    server.use(
        pino({
          transport: {
            target: 'pino-pretty',
          },
        }),
      );
    
    server.get('*',(req,res)=>{
    
        res.status(404).json({
            status: 404,
            message: "Not available route",
        });
    });

    server.use(express.json());
    server.use(cors());

    
server.get('/contacts',(req,res)=>{
    res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
            // İstek işlenmesi sonucunda elde edilen iletişimler dizisi
    });
});


server.get('/contacts/:contactId',(req,res)=>{
    
    res.status(200).json({
        status: 200,
        message: "Successfully found contact with id {**contactId**}!",
        data:contact
    });
    res.status(404).json({
        status: 404,
        message: 'Contact not found',
        data: contact,
        //Verilen kimlik numarasıyla iletişimin bulunup bulunmadığını kontrol edin. Eğer iletişim bulunamazsa, 404 durum kodu ile aşağıdaki nesneyi döndürün
            // İstek işlenmesi sonucunda elde edilen iletişim
    });
});


    server.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}.`)
    });
}





