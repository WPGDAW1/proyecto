
import java.io.FileWriter;
import java.util.Scanner;

public class enviaCSV {
    public static void main(String[] args) {
        
        Scanner sc = new Scanner(System.in);
        // tengo que recibir aqui y pasarlo al csv de suscriptores, igual con expositores
        String linea = sc.nextLine();
        String frase = linea.replaceAll(" ", ",");

        try {
            FileWriter fw = new FileWriter("suscriptores.csv",true);
            fw.write(frase+"\n");
            fw.close();

        } catch (Exception e) {
            System.out.println("Excepción: " + e.toString());
        }
            
        

    }
}
