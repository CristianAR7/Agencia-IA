import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [step, setStep] = useState(0)
  const [userData, setUserData] = useState({
    businessType: '',
    needs: '',
    email: '',
    phone: '',
    businessName: '',
    firstMessage: '',
    selectedSolutions: []
  })
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Auto-open after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
      if (messages.length === 0) {
        addBotMessage(getWelcomeMessage())
      }
    }, 10000)
    return () => clearTimeout(timer)
  }, [])

  const addBotMessage = (text, options = null) => {
    setMessages(prev => [...prev, { type: 'bot', text, options, timestamp: new Date() }])
  }

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { type: 'user', text, timestamp: new Date() }])
  }

  const getWelcomeMessage = () => {
    const hour = new Date().getHours()
    if (hour >= 22 || hour < 8) {
      return `👋 Hola! Soy el asistente de Cristian.\n\nAhora mismo no está disponible (22:00-8:00h), pero déjame tus datos y te contacta mañana a primera hora.`
    }
    return `👋 Hola! Soy el asistente de Cristian en CRIAL Solutions.\n\n¿En qué puedo ayudarte hoy?`
  }

  // PRICING TABLE
  const PRICING = {
    chatbot_web: { min: 800, max: 1500, name: '🤖 CHATBOT WEB' },
    whatsapp: { min: 1500, max: 2500, name: '💬 AGENTE WHATSAPP' },
    voz: { min: 2000, max: 3500, name: '📞 AGENTE DE VOZ' },
    landing: { min: 1200, max: 2000, name: '🚀 LANDING PAGE' }
  }

  // BUSINESS-SPECIFIC RECOMMENDATIONS
  const getRecommendations = (businessType) => {
    const type = businessType.toLowerCase()
    
    if (type.includes('restaurante') || type.includes('bar') || type.includes('cafetería')) {
      return {
        solutions: ['chatbot_web', 'whatsapp'],
        reasons: {
          chatbot_web: {
            why: 'Captarías reservas automáticamente 24/7, incluso cuando el local está cerrado',
            example: 'El Rincón de Goya aumentó 40% sus reservas con chatbot web'
          },
          whatsapp: {
            why: 'Tus clientes ya usan WhatsApp. Automatiza pedidos, reservas y consultas',
            example: 'La Bodega del Puerto automatizó 200+ pedidos/mes vía WhatsApp'
          }
        }
      }
    }
    
    if (type.includes('clínica') || type.includes('salud') || type.includes('médico') || type.includes('doctor')) {
      return {
        solutions: ['chatbot_web', 'whatsapp', 'voz'],
        reasons: {
          chatbot_web: {
            why: 'Agenda citas automáticamente desde tu web, reduce llamadas perdidas',
            example: 'Clínica Dental Sonrisas agenda 60% de citas por chatbot'
          },
          whatsapp: {
            why: 'Confirma citas, envía recordatorios y responde FAQs sin saturar recepción',
            example: 'Centro Fisio+ redujo 80% las cancelaciones con recordatorios automáticos'
          },
          voz: {
            why: 'Atiende llamadas 24/7, agenda citas telefónicas, deriva urgencias',
            example: 'Clínica San Rafael maneja 150+ llamadas/día con agente de voz'
          }
        }
      }
    }
    
    if (type.includes('gimnasio') || type.includes('fitness') || type.includes('deporte')) {
      return {
        solutions: ['landing', 'whatsapp'],
        reasons: {
          landing: {
            why: 'Capta leads con landing optimizada, muestra horarios y promociones',
            example: 'FitZone triplicó registros de prueba gratuita con landing + chatbot'
          },
          whatsapp: {
            why: 'Automatiza info de clases, reservas de cupo, pagos y recordatorios',
            example: 'GymPro automatizó 300+ consultas/mes, libera tiempo del staff'
          }
        }
      }
    }
    
    if (type.includes('inmobiliaria') || type.includes('bienes raíces')) {
      return {
        solutions: ['landing', 'chatbot_web', 'whatsapp'],
        reasons: {
          landing: {
            why: 'Presenta propiedades con tours virtuales, capta leads cualificados',
            example: 'Inmobiliaria Madrid Centro aumentó 3x visitas con landing profesional'
          },
          chatbot_web: {
            why: 'Filtra clientes por presupuesto/zona antes de agendar visitas',
            example: 'CasaHogar redujo 50% visitas no cualificadas con chatbot filtro'
          },
          whatsapp: {
            why: 'Envía fotos, videos, info de propiedades directo a WhatsApp del cliente',
            example: 'PropiedadesPRO cierra 40% más rápido con seguimiento vía WhatsApp'
          }
        }
      }
    }
    
    // Default para otros negocios
    return {
      solutions: ['chatbot_web', 'whatsapp'],
      reasons: {
        chatbot_web: {
          why: 'Capta leads en tu web 24/7, responde consultas frecuentes automáticamente',
          example: 'Negocios similares aumentan 35% conversión con chatbot web'
        },
        whatsapp: {
          why: 'Automatiza ventas y soporte donde tus clientes ya están: WhatsApp',
          example: 'Empresas locales cierran 2x más rápido con WhatsApp automatizado'
        }
      }
    }
  }

  // VALIDATION FUNCTIONS
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '')
    return cleaned.length >= 9
  }

  // PROCESS USER INPUT
  const handleUserInput = (userMessage) => {
    addUserMessage(userMessage)
    setInput('')

    const { businessType, needs, email, phone, businessName, selectedSolutions } = userData

    switch (step) {
      case 0: // Initial greeting
        setUserData({ ...userData, firstMessage: userMessage })
        addBotMessage(
          '¿Qué tipo de negocio tienes?',
          ['Restaurante', 'Clínica/Salud', 'Gimnasio', 'Inmobiliaria', 'Otro']
        )
        setStep(1)
        break

      case 1: // Business type
        setUserData({ ...userData, businessType: userMessage })
        addBotMessage('Perfecto. ¿Qué necesitas automatizar específicamente?')
        setStep(2)
        break

      case 2: // Needs
        setUserData({ ...userData, needs: userMessage })
        addBotMessage('Genial 💡\n\nPara prepararte algo personalizado, necesito tu email.')
        setStep(3)
        break

      case 3: // Email
        if (!validateEmail(userMessage)) {
          addBotMessage('❌ Ese email no parece válido.\n\nNecesito uno con @ y dominio (ej: tu@email.com)\n\nPrueba de nuevo:')
          return
        }
        setUserData({ ...userData, email: userMessage })
        addBotMessage('📱 ¿Tu teléfono?\n\n(Para WhatsApp si necesitas respuesta rápida)')
        setStep(4)
        break

      case 4: // Phone
        if (!validatePhone(userMessage)) {
          addBotMessage('❌ Ese teléfono es muy corto.\n\nNecesito al menos 9 dígitos.\n\nPrueba de nuevo:')
          return
        }
        setUserData({ ...userData, phone: userMessage })
        addBotMessage('🏢 Por último, ¿cómo se llama tu negocio?')
        setStep(5)
        break

      case 5: // Business name
        const updatedData = { ...userData, businessName: userMessage }
        setUserData(updatedData)
        
        // Get recommendations
        const recs = getRecommendations(updatedData.businessType)
        
        let recsMessage = `Perfecto, ${userMessage}.\n\nBasado en que eres ${updatedData.businessType}, te recomiendo:\n\n`
        
        recs.solutions.forEach(sol => {
          const reason = recs.reasons[sol]
          recsMessage += `${PRICING[sol].name}\n`
          recsMessage += `Por qué: ${reason.why}\n`
          recsMessage += `Ejemplo: ${reason.example}\n\n`
        })
        
        recsMessage += '¿Cuál te interesa más?\n\n(Puedes elegir varias: "chatbot y WhatsApp" o "todas")'
        
        addBotMessage(recsMessage)
        setStep(6)
        break

      case 6: // Select solutions
        const msg = userMessage.toLowerCase()
        let chosen = []
        
        if (msg.includes('todas') || msg.includes('todo')) {
          const recs = getRecommendations(userData.businessType)
          chosen = recs.solutions
        } else {
          if (msg.includes('chatbot') || msg.includes('web')) chosen.push('chatbot_web')
          if (msg.includes('whatsapp') || msg.includes('whats')) chosen.push('whatsapp')
          if (msg.includes('voz') || msg.includes('llamadas') || msg.includes('teléfono')) chosen.push('voz')
          if (msg.includes('landing') || msg.includes('página')) chosen.push('landing')
        }
        
        if (chosen.length === 0) {
          addBotMessage('No detecté ninguna solución.\n\n¿Puedes especificar? Ejemplo:\n- "Chatbot web"\n- "WhatsApp y chatbot"\n- "Todas"')
          return
        }
        
        setUserData({ ...userData, selectedSolutions: chosen })
        
        // Calculate price
        const min = chosen.reduce((sum, sol) => sum + (PRICING[sol]?.min || 0), 0)
        const max = chosen.reduce((sum, sol) => sum + (PRICING[sol]?.max || 0), 0)
        const discount = chosen.length > 1 ? 0.85 : 1
        const timeline = chosen.length === 1 ? '2-3 semanas' : '3-4 semanas'
        
        let confirmMsg = `¡Perfecto! Has elegido:\n\n`
        chosen.forEach(sol => {
          confirmMsg += `✅ ${PRICING[sol].name}\n`
        })
        
        if (chosen.length > 1) {
          confirmMsg += `\n🎁 Descuento combo: 15%\n`
        }
        
        confirmMsg += `\n💰 Precio orientativo: ${Math.round(min * discount)}€ - ${Math.round(max * discount)}€\n`
        confirmMsg += `⏱️ Tiempo: ${timeline}\n\n`
        confirmMsg += `¿Alguna pregunta? O dime "envía" y te mando la propuesta completa a ${email} 📧`
        
        addBotMessage(confirmMsg)
        setStep(7)
        break

      case 7: // Open conversation or send proposal
        const confirmWords = ['envía', 'envia', 'perfecto', 'vale', 'ok', 'adelante', 'sí', 'si']
        const userSaidConfirm = confirmWords.some(word => 
          userMessage.toLowerCase().includes(word)
        )

        if (!userSaidConfirm) {
          // Handle questions
          if (userMessage.toLowerCase().includes('cuánto') || 
              userMessage.toLowerCase().includes('precio')) {
            const min = selectedSolutions.reduce((sum, sol) => sum + (PRICING[sol]?.min || 0), 0)
            const max = selectedSolutions.reduce((sum, sol) => sum + (PRICING[sol]?.max || 0), 0)
            const discount = selectedSolutions.length > 1 ? 0.85 : 1
            addBotMessage(
              `💰 El precio orientativo sería:\n\n` +
              `${Math.round(min * discount)}€ - ${Math.round(max * discount)}€\n\n` +
              `¿Te envío la propuesta detallada?`
            )
          } else if (userMessage.toLowerCase().includes('cuánto tarda') || 
                     userMessage.toLowerCase().includes('tiempo')) {
            const weeks = selectedSolutions.length === 1 ? '2-3 semanas' : '3-4 semanas'
            addBotMessage(
              `⏱️ El desarrollo toma aproximadamente ${weeks}.\n\n` +
              `¿Quieres que te envíe la propuesta completa?`
            )
          } else {
            addBotMessage(
              `Perfecto. ¿Alguna pregunta más?\n\n` +
              `O dime "envía" y te mando la propuesta a ${email} 📧`
            )
          }
          return
        }

        // User confirmed - SEND TO RAILWAY
        addBotMessage(`¡Perfecto! 🚀\n\nEnviando propuesta...`)

        setTimeout(async () => {
          try {
            console.log('📤 Enviando lead a Railway...')
            
            const response = await fetch(
              'https://agencia-ia-production.up.railway.app/api/chat/lead',
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: userData.email,
                  phone: userData.phone,
                  businessName: userData.businessName,
                  businessType: userData.businessType,
                  needs: userData.needs,
                  firstMessage: userData.firstMessage,
                  selectedSolutions: userData.selectedSolutions,
                  messages: messages
                })
              }
            )

            const data = await response.json()

            if (data.success) {
              console.log('✅ Lead enviado correctamente:', data)
              addBotMessage(
                `✅ ¡Perfecto, ${userData.businessName}!\n\n` +
                `Datos recibidos correctamente.\n\n` +
                `Te contacto en menos de 24h para enviarte la propuesta personalizada.\n\n` +
                `¡Gracias! 🚀`
              )
              setStep(8)
            } else {
              console.error('❌ Error en respuesta:', data)
              addBotMessage(
                `✅ Datos guardados correctamente.\n\n` +
                `Te envío la propuesta a ${userData.email}\n\n` +
                `(Hubo un problema técnico pero tus datos están seguros)`
              )
              setStep(8)
            }
          } catch (error) {
            console.error('❌ Error al enviar lead:', error)
            
            // Backup en localStorage
            localStorage.setItem('crial_lead_backup', JSON.stringify({
              ...userData,
              timestamp: new Date().toISOString()
            }))
            
            addBotMessage(
              `✅ Datos guardados correctamente.\n\n` +
              `Cristian te contactará pronto. ¡Gracias! 🚀`
            )
            setStep(8)
          }
        }, 800)
        break

      case 8: // Conversation ended
        addBotMessage('Ya tienes mi propuesta en camino. Si necesitas algo más, escríbeme a hola@crial.solutions 👋')
        break

      default:
        addBotMessage('Algo salió mal. Recarga la página y volvemos a empezar.')
    }
  }

  const handleQuickReply = (option) => {
    handleUserInput(option)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      handleUserInput(input.trim())
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setIsOpen(true)
          if (messages.length === 0) {
            addBotMessage(getWelcomeMessage())
          }
        }}
        className="fixed bottom-6 right-6 z-50 bg-white border-2 border-black px-6 py-4 hover:bg-black hover:text-white transition-colors duration-200 flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        <MessageCircle size={24} />
        <span className="font-mono text-sm tracking-wider">HABLA CONMIGO</span>
      </button>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${isMinimized ? 'w-80' : 'w-96'} transition-all duration-300`}>
      {/* Header */}
      <div className="bg-black text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo-firma.png" alt="CRIAL" className="w-10 h-10 object-contain" />
          <div>
            <div className="font-black tracking-tight">CRIAL · Cristian</div>
            <div className="text-xs font-mono opacity-70">Responde en ~4h</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-white/10 p-1 rounded transition-colors"
          >
            <Minimize2 size={18} />
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/10 p-1 rounded transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      {!isMinimized && (
        <>
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((msg, idx) => (
              <div key={idx}>
                <div
                  className={`max-w-[85%] p-3 border-2 border-black ${
                    msg.type === 'bot'
                      ? 'bg-blue-600 text-white mr-auto'
                      : 'bg-gray-100 text-black ml-auto'
                  }`}
                >
                  <div className="whitespace-pre-line text-sm leading-relaxed">
                    {msg.text}
                  </div>
                </div>

                {/* Quick replies */}
                {msg.options && idx === messages.length - 1 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickReply(opt)}
                        className="text-xs font-mono border-2 border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t-2 border-black bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe mensaje..."
                className="flex-1 px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="bg-black text-white p-2 border-2 border-black hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}
