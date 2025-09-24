// FormCalendar.jsx
'use client'

import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { cn } from '../../../utils/utils'
import { Button } from '../../../components/ui/button'
import { Calendar } from '../../../components/ui/calendar'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/ui/popover'

const FormSchema = z.object({
  dob: z.date({ required_error: 'Se requiere una fecha de nacimiento.' }),
})

export function CalendarForm() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { dob: undefined },
  })

  function onSubmit(data) {
    toast('Valores enviados', {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="dob"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de nacimiento</FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        // 👇 Formato en español (Argentina)
                        format(field.value, 'PPP', { locale: es })
                      ) : (
                        <span>Elegí una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    locale={es} // 👈 meses/días en español
                    mode="single"
                    selected={field.value}
                    onSelect={(d) => field.onChange(d ?? field.value)}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    captionLayout="dropdown"
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormDescription>
                Usamos tu fecha de nacimiento para calcular tu edad.
              </FormDescription>

              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  )
}
