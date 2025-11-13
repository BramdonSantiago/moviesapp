package io.ionic.starter;

import com.getcapacitor.BridgeActivity;

import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;
import android.graphics.Color;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Obtenemos la ventana actual
        Window window = getWindow();

        // Cambiar colores de status bar y navigation bar
        window.setNavigationBarColor(Color.parseColor("#000000"));

        // Asegurar que los iconos sean blancos (modo oscuro)
        window.getDecorView().setSystemUiVisibility(0);
    }
}
