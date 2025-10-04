import { NextRequest, NextResponse } from "next/server"

// Fallback responses for specific questions
const fallbackResponses = {
  "hello": "Hello! Welcome to MarEye Marine Security Platform. I'm your AI assistant here to help you with marine security operations, submarine detection, and underwater threat assessment. How can I assist you today?",
  
  "project features": "MarEye Marine Security Platform offers comprehensive AI-powered solutions for underwater security:\n\n- **CNN Image Processing**: Advanced Convolutional Neural Networks for underwater image enhancement and quality improvement\n- **Object Detection**: AI-powered YOLO detection system for submarines, mines, and divers\n- **Real-time Analysis**: Instant threat identification and classification\n- **Marine Security Operations**: Complete defense system for underwater environments\n- **Threat Assessment**: Comprehensive security analysis and evaluation\n\nOur platform combines cutting-edge computer vision, machine learning, and real-time surveillance for comprehensive marine security operations."
}

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    // Simulate API delay (5 seconds)
    await new Promise(resolve => setTimeout(resolve, 5000))

    const lowerMessage = message.toLowerCase().trim()
    
    // Check for specific questions and provide fallback responses
    if (lowerMessage.includes("hello") || lowerMessage === "hi" || lowerMessage === "hey") {
      return NextResponse.json({ response: fallbackResponses.hello })
    }
    
    if (lowerMessage.includes("project") && lowerMessage.includes("feature") || 
        lowerMessage.includes("feature") || 
        lowerMessage.includes("what can") ||
        lowerMessage.includes("tell me about")) {
      return NextResponse.json({ response: fallbackResponses["project features"] })
    }

    // Default response for other questions
    const defaultResponse = "I'm the MarEye Marine Security AI Assistant. I can help you with:\n\n- Understanding our CNN image processing capabilities\n- Explaining our object detection systems\n- Providing information about marine security operations\n- Guiding you through threat assessment processes\n\nPlease ask me about our project features or say hello to get started!"

    return NextResponse.json({ response: defaultResponse })

  } catch (error) {
    console.error("Chatbot API error:", error)
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    )
  }
}
