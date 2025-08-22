
export const WorkerInfo = ({ data }) => {
  return (
    <>
      <div className='space-y-3 bg-white rounded-xl p-4'>
        {Object.entries(data)
          .filter(([key]) => key !== 'id')
          .map(([key, value], index, array) => (
            <dl key={key} 
              className={`grid grid-cols-[200px_1fr] gap-y-4 pb-3 ${
                index !== array.length - 1 ? 'border-b border-gray-300' : ''
              }`}
            >
              <dt className='text-gray-500 font-medium'>{key}</dt>
              <dd className='text-gray-800 font-semibold'>{value}</dd>
            </dl>
          ))
        }
      </div>
    </>
  )
}
