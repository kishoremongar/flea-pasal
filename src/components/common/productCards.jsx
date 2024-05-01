export default function ProductCards() {
  const data = [
    {
      id: '1',
      title: 'Blue Shirt',
      productImage:
        'https://res.cloudinary.com/fushigina-shinobi/image/upload/v1664008364/Pink-hoodie_vbnacz.jpg',
      brand: 'H & M',
      realPrice: '1399',
      sellingPrice: '649',
      ctaBtn: 'Add to cart',
    },
    {
      id: '2',
      title: 'White Top',
      productImage:
        'https://res.cloudinary.com/fushigina-shinobi/image/upload/v1664008364/Pink-hoodie_vbnacz.jpg',
      brand: 'Nike',
      realPrice: '1499',
      sellingPrice: '799',
      ctaBtn: 'Add to cart',
    },
    {
      id: '3',
      title: 'Pink Hoodie',
      productImage:
        'https://res.cloudinary.com/fushigina-shinobi/image/upload/v1664008364/Pink-hoodie_vbnacz.jpg',
      brand: 'Dior',
      realPrice: '399',
      sellingPrice: '299',
      ctaBtn: 'Add to cart',
    },
    {
      id: '4',
      title: 'Black Jeans',
      productImage:
        'https://res.cloudinary.com/fushigina-shinobi/image/upload/v1664008364/Pink-hoodie_vbnacz.jpg',
      brand: 'Puma',
      realPrice: '999',
      sellingPrice: '699',
      ctaBtn: 'Add to cart',
    },
  ];

  return (
    <div className='flex justify-center gap-x-12 items-center bg-gray-50'>
      {data.map((item) => {
        return (
          <div key={item.id} className='w-60'>
            <div className='bg-white my-24 shadow-md hover:shadow-xl duration-500 rounded-xl'>
              <div id='productImage'>
                <img
                  src={item.productImage}
                  alt='Product'
                  className='h-64 w-60 object-cover rounded-t-xl'
                />
              </div>
              <div className='px-4 py-3'>
                <span className='text-gray-400 mr-3 uppercase text-xs'>
                  {item.brand}
                </span>
                <p className='text-lg text-black truncate block capitalize'>
                  {item.title}
                </p>
                <div className='flex items-center'>
                  <p className='text-lg font-semibold text-black cursor-auto my-3'>
                    &#8377;{item.sellingPrice}
                  </p>
                  <del>
                    <p className='text-sm text-gray-600 cursor-auto ml-2'>
                      &#8377;{item.realPrice}
                    </p>
                  </del>
                  <div className='ml-auto'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      fill='currentColor'
                      className='bi bi-bag-plus text-darkerPink hover:text-darkPink'
                      viewBox='0 0 16 16'
                    >
                      <path
                        fillRule='evenodd'
                        d='M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z'
                      />
                      <path d='M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z' />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
