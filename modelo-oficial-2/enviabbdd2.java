// este es para el envio de expositores
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
public class enviabbdd2 {
    public static void main(String[] args) {

        try {
            Connection con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/FeriaValencia", "Admin", "Admin");
            File f = new File("expositores.csv");
            FileReader fr = new FileReader(f);
            BufferedReader br = new BufferedReader(fr);
            String linea = br.readLine();
            int count = 0;

            while(linea != null){

                String [] datos = linea.split(",");
                String nombre = datos[0];
                String email = datos[1];
                String idioma = datos[2];
                int suscrito = Integer.parseInt(datos[3]);
		String fecha_nac = datos[4];
		String tipoUsuario = datos[5];

		PreparedStatement pregunta = con.prepareStatement("SELECT Count(*) FROM suscriptores WHERE email = ?"); 
                pregunta.setString(1, email);
                ResultSet rs = pregunta.executeQuery();
                rs.next();
                int counti = rs.getInt(1);
                if (counti == 0){
                String sql = "INSERT INTO suscriptores (nombre, email, idioma, suscrito, fecha_nac, tipoUsuario) VALUES (?,?,?,?,?,?)";
                PreparedStatement st = con.prepareStatement(sql);
                st.setString(1, nombre);
                st.setString(2, email);
                st.setString(3, idioma);
                st.setInt(4, suscrito);
		st.setString(5, fecha_nac);
		st.setString(6, tipoUsuario);
                st.executeUpdate();
                count++;
                linea = br.readLine();
            }
	}
            System.out.println("Se agregaron "+ count + " registros correctamente.");
        } catch (Exception e) {
            System.out.println("Excepción: "+e.toString());
        }
    }
}
