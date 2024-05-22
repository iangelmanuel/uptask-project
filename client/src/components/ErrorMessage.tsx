export const ErrorMessage = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="my-4 bg-red-100 p-3 text-center text-sm font-bold uppercase text-red-600">
      {children}
    </div>
  )
}
