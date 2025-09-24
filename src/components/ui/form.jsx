// components/ui/form.jsx
import * as React from 'react'
import { FormProvider, Controller, useFormContext } from 'react-hook-form'
import { cn } from '../../utils/utils'

const Form = ({ children, ...form }) => {
  // Recibe el objeto "form" de useForm y lo expone con FormProvider
  return <FormProvider {...form}>{children}</FormProvider>
}
Form.displayName = 'Form'

/**
 * Contexto para pasar el id del item a Label/Message/Control
 */
const FormItemContext = React.createContext({ id: '' })
export const useFormItem = () => React.useContext(FormItemContext)

/**
 * <FormField name="... " render={({ field }) => (...) } />
 * Azúcar para Controller de react-hook-form
 */
const FormField = ({ ...form }) => {
  const { control } = useFormContext()
  return <Controller control={control} {...form} />
}
FormField.displayName = 'FormField'

/**
 * Contenedor de un campo (label + control + message)
 */
const FormItem = React.forwardRef(function FormItem(
  { className, children, ...form },
  ref
) {
  const id = React.useId()
  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-1', className)} {...form}>
        {children}
      </div>
    </FormItemContext.Provider>
  )
})
FormItem.displayName = 'FormItem'

/**
 * Label asociado al item
 */
const FormLabel = React.forwardRef(function FormLabel(
  { className, ...form },
  ref
) {
  const { id } = useFormItem()
  return (
    <label
      ref={ref}
      htmlFor={id}
      className={cn('text-sm font-medium leading-none', className)}
      {...form}
    />
  )
})
FormLabel.displayName = 'FormLabel'

/**
 * Envuelve el input/control para setear id/aria
 */
const FormControl = React.forwardRef(function FormControl(
  { className, children, ...props },
  ref
) {
  const { id } = useFormItem()
  const child = React.Children.only(children)

  // Pasamos handlers/props (onClick, ref, etc.) DIRECTO al hijo
  return React.cloneElement(child, {
    id,
    ref,
    className: cn(child.props.className, className),
    'aria-describedby': `${id}-description ${id}-message`,
    ...props, // <<--- crítico: props del PopoverTrigger llegan al Button
  })
})
FormControl.displayName = 'FormControl'

/**
 * Mensaje de ayuda (debajo del control)
 */
const FormDescription = ({ className, ...form }) => {
  const { id } = useFormItem()
  return (
    <p
      id={`${id}-description`}
      className={cn('text-[0.8rem] text-muted-foreground', className)}
      {...form}
    />
  )
}
FormDescription.displayName = 'FormDescription'

/**
 * Mensaje de error (debajo del control)
 */
const FormMessage = ({ className, children, ...form }) => {
  const { id } = useFormItem()
  const { formState } = useFormContext()
  // Si no pasás children, intenta mostrar el error del último campo renderizado
  const message =
    children ||
    (formState.errors &&
      // nota: cuando se usa render prop, el error ya se maneja ahí
      null)

  return (
    <p
      id={`${id}-message`}
      className={cn('text-[0.8rem] font-medium text-destructive', className)}
      {...form}
    >
      {message}
    </p>
  )
}
FormMessage.displayName = 'FormMessage'

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
}
